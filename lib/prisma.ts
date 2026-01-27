import { PrismaClient } from '@prisma/client';

// Singleton pattern para Prisma Client en desarrollo
// Previene múltiples instancias durante hot-reload

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Usar Prisma Accelerate si está disponible, sino usar DATABASE_URL estándar
const databaseUrl = process.env.PRISMA_DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL o PRISMA_DATABASE_URL debe estar definida en las variables de entorno'
  );
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
