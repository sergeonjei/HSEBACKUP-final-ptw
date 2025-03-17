import { PrismaClient, User, Role } from "@prisma/client";

const prisma = new PrismaClient();

interface HierarchyNode {
  id: string;
  name: string;
  role: Role;
  subordinates: HierarchyNode[];
}

export async function buildCompanyHierarchy(companyId: string): Promise<HierarchyNode[]> {
  // Get all users in the company
  const users = await prisma.user.findMany({
    where: {
      companyId: companyId,
    },
    include: {
      subordinates: true,
    },
  });

  // Find root nodes (users with no supervisor)
  const rootNodes = users.filter(user => !user.reportsTo);

  // Recursively build the hierarchy
  return Promise.all(rootNodes.map(user => buildHierarchyNode(user, users)));
}

async function buildHierarchyNode(user: User & { subordinates: User[] }, allUsers: User[]): Promise<HierarchyNode> {
  const subordinates = await Promise.all(
    user.subordinates.map(subordinate => 
      buildHierarchyNode(
        allUsers.find(u => u.id === subordinate.id) as User & { subordinates: User[] },
        allUsers
      )
    )
  );

  return {
    id: user.id,
    name: user.name || "",
    role: user.role,
    subordinates,
  };
}

export async function updateUserHierarchy(
  userId: string,
  newSupervisorId: string | null
): Promise<User> {
  return prisma.user.update({
    where: { id: userId },
    data: { reportsTo: newSupervisorId },
    include: { supervisor: true, subordinates: true },
  });
}

export async function validateHierarchyChange(
  userId: string,
  newSupervisorId: string
): Promise<{ valid: boolean; message: string }> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { company: true },
  });

  const newSupervisor = await prisma.user.findUnique({
    where: { id: newSupervisorId },
    include: { company: true },
  });

  if (!user || !newSupervisor) {
    return { valid: false, message: "User or supervisor not found" };
  }

  if (user.companyId !== newSupervisor.companyId) {
    return { valid: false, message: "Users must be in the same company" };
  }

  // Check for circular references
  let currentSupervisor = newSupervisor;
  while (currentSupervisor.reportsTo) {
    if (currentSupervisor.reportsTo === userId) {
      return { valid: false, message: "Circular reference detected" };
    }
    currentSupervisor = await prisma.user.findUnique({
      where: { id: currentSupervisor.reportsTo },
    }) as User;
  }

  return { valid: true, message: "Valid hierarchy change" };
}

export async function getSubordinates(userId: string, recursive: boolean = false): Promise<User[]> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subordinates: true },
  });

  if (!user) {
    return [];
  }

  if (!recursive) {
    return user.subordinates;
  }

  const allSubordinates: User[] = [...user.subordinates];
  for (const subordinate of user.subordinates) {
    const subSubordinates = await getSubordinates(subordinate.id, true);
    allSubordinates.push(...subSubordinates);
  }

  return allSubordinates;
}

export async function getSupervisors(userId: string): Promise<User[]> {
  const supervisors: User[] = [];
  let currentUser = await prisma.user.findUnique({
    where: { id: userId },
    include: { supervisor: true },
  });

  while (currentUser?.supervisor) {
    supervisors.push(currentUser.supervisor);
    currentUser = await prisma.user.findUnique({
      where: { id: currentUser.supervisor.id },
      include: { supervisor: true },
    });
  }

  return supervisors;
} 