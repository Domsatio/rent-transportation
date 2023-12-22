import { PrismaClient } from '@prisma/client';

// const globalForPrisma = globalThis as unknown as {
//     prisma: PrismaClient | undefined;
// }

// const prisma = globalForPrisma.prisma ?? new PrismaClient();

// if (process.env.NODE_ENV !== 'production') {
//     globalForPrisma.prisma = prisma;
// }

// export const db =  prisma;
let prisma;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient({
            errorFormat: 'pretty',
            log: ['warn', 'error', "info", "query"]
        });
    }
    prisma = global.prisma;
}
export const db =  prisma;


