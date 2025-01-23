import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const vendorResolvers = {
  Query: {
    vendors: async (_: any, args: { page?: number; pageSize?: number }) => {
      try {
        const page = args.page || 1;
        const pageSize = args.pageSize || 10;
        const vendors = await prisma.vendor.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          include: { menus: true },
        });
        return vendors;
      } catch (error) {
        console.error("Error fetching vendors:", error);
        throw new Error("Unable to fetch vendors");
      }
    },
    
  },   
  Mutation: {
    createVendor: async (
      _: any,
      args: {
        input: { name: string; email: string; phone: string; address: string };
      }
    ) => {
      const { name, email, phone, address } = args.input;

      if (!email || !email.includes("@")) {
        throw new Error("Invalid email address");
      }

      try {
        const newVendor = await prisma.vendor.create({
          data: { name, email, phone, address },
        });
        console.log('Created vendor:', newVendor);
        return newVendor;
      } catch (error) {
        console.error("Error creating vendor:", error);
        throw new Error("Unable to create vendor");
      }
    },
  },
};

export default vendorResolvers;
