import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.menu.deleteMany();
  await prisma.vendor.deleteMany();

  const vendor1 = await prisma.vendor.create({
    data: {
      name: 'Vendor 1',
      email: 'vendor1@example.com',
      phone: '1234567890',
      address: '123 Main St',
      menus: {
        create: [
          { name: 'Pizza', price: 10.99, category: 'Lunch' },
          { name: 'Burger', price: 8.99, category: 'Dinner' },
        ],
      },
    },
  });

  const vendor2 = await prisma.vendor.create({
    data: {
      name: 'Vendor 2',
      email: 'vendor2@example.com',
      phone: '9876543210',
      address: '456 Elm St',
      menus: {
        create: [
          { name: 'Sushi', price: 15.99, category: 'Breakfast' },
          { name: 'Ramen', price: 12.99, category: 'Lunch' },
        ],
      },
    },
  });

  console.log({ vendor1, vendor2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
