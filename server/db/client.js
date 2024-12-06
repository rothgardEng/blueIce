// TODO: ENSURE THIS RUNS OFF OF ONE CLIENT (code below, refactor to function importing two client instances)


// this is to ensure that we only connect to one instance of Prisma

import { PrismaClient } from "@prisma/client";

export const prisma =
    global.prisma ||
    new PrismaClient()

if(process.env.NODE_ENV !== 'production') global.prisma = prisma


