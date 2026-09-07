// Client Prisma partagé par toutes les routes.
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
