import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
  try {
    return new PrismaClient();
  } catch (error) {
    console.error("Failed to initialize Prisma client:", error);
    // Return a minimal implementation that won't crash the app
    return {
      user: {
        findUnique: async () => null,
      },
      $connect: async () => {},
      $disconnect: async () => {},
    } as unknown as PrismaClient;
  }
}

export const prisma = global.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
} 