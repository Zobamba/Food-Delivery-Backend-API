import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userResolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },
    user: async (_: any, args: { id: number }) => {
      return await prisma.user.findUnique({ where: { id: args.id } });
    },
  },
  Mutation: {
    createUser: async (_: any, args: { input: { name: string; email: string; phone: string } }) => {
      const { name, email, phone } = args.input;

      if (!email.includes('@')) {
        throw new Error('Invalid email address');
      }

      return await prisma.user.create({
        data: { name, email, phone },
      });
    },
  },
};

export default userResolvers;
