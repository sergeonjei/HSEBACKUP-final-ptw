import { PrismaClient, UserRole } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed script...');
  
  // Create admin user if none exists
  const adminExists = await prisma.user.findFirst({
    where: {
      role: UserRole.ADMIN
    }
  });
  
  if (!adminExists) {
    const hashedPassword = await hash('Admin@123', 10);
    
    const admin = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: UserRole.ADMIN,
      },
    });
    
    console.log(`Created admin user: ${admin.email}`);
  } else {
    console.log('Admin user already exists, skipping creation');
  }

  // Create a default company
  const companyExists = await prisma.company.findFirst();
  
  if (!companyExists) {
    const company = await prisma.company.create({
      data: {
        name: 'Default Company',
        industry: 'Construction',
      },
    });
    
    console.log(`Created default company: ${company.name}`);
  } else {
    console.log('Company already exists, skipping creation');
  }

  console.log('Seed script completed successfully');
}

main()
  .catch((e) => {
    console.error('Error in seed script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 