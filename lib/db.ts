import { PrismaClient } from '@prisma/client';

// This 'declare' block tells TypeScript about a global variable we might set.
// This is used to preserve the Prisma client across hot reloads in development.
declare global {
  var prisma: PrismaClient | undefined;
}

// If 'globalThis.prisma' exists, use it. Otherwise, create a new PrismaClient.
// In production, 'globalThis.prisma' will always be undefined, creating just one client.
export const db = globalThis.prisma || new PrismaClient();

// In development, we assign the new client to the global variable
// so it can be reused on the next hot reload.
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}