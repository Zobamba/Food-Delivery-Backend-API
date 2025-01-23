import { PrismaClient } from "@prisma/client";
import { authenticate } from '../../utils/auth';

const prisma = new PrismaClient();

const orderResolvers = {
  Query: {
    userOrders: async (_: any, args: { userId: number }, context: { token: string }) => {
      authenticate(context.token);
      if (!args.userId) throw new Error("User ID is required");
      return await prisma.order.findMany({
        where: { userId: args.userId },
        include: { menu: true },
      });
    },
  },
  Mutation: {
    createOrder: async (
      _: any,
      args: {
        input: {
          userId: number;
          menu_id: number;
          quantity: number;
          status: string;
        };
      }
    ) => {
      const { userId, menu_id, quantity, status } = args.input;

      if (quantity <= 0) {
        throw new Error("Quantity must be greater than zero");
      }

      return await prisma.order.create({
        data: { userId, menu_id, quantity, status },
      });
    },
    updateOrderStatus: async (_: any, args: { id: number; status: string }) => {
      const { id, status } = args;
      if (!["PENDING", "COMPLETED", "CANCELLED"].includes(status)) {
        throw new Error("Invalid status");
      }
      return await prisma.order.update({ where: { id }, data: { status } });
    },
  },
};

export default orderResolvers;
