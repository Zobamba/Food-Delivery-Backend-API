import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const menuResolvers = {
  Query: {
    menus: async () => {
      return await prisma.menu.findMany({ include: { vendor: true } });
    },
    menu: async (_: any, args: { id: number }) => {
      return await prisma.menu.findUnique({
        where: { id: args.id },
        include: { vendor: true },
      });
    },
  },
  Mutation: {
    createMenu: async (
      _: any,
      args: {
        input: {
          vendor_id: number;
          name: string;
          price: number;
          category: string;
          is_available: boolean;
        };
      }
    ) => {
      const { vendor_id, name, price, category, is_available } = args.input;
      if (price <= 0) {
        throw new Error("Price must be greater than zero");
      }

      return await prisma.menu.create({
        data: { vendor_id, name, price, category, is_available },
      });
    },
  },
};

export default menuResolvers;
