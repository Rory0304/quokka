import { PrismaClient } from "@prisma/client";

declare global {
  var _prisma: PrismaClient | undefined;
}

const prisma =
  globalThis._prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalThis._prisma = prisma;
}

export { prisma };
