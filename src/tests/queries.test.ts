import request from "supertest";
import { PrismaClient } from "@prisma/client";
import { httpServer } from "../index";

const prisma = new PrismaClient();

describe("GraphQL Queries", () => {
  beforeAll(async () => {
    await prisma.menu.deleteMany();
    await prisma.vendor.deleteMany();
    await prisma.vendor.create({
      data: {
        name: "Vendor 1",
        email: "vendor1@example.com",
        phone: "1234567890",
        address: "123 Vendor Street",
        menus: {
          create: [
            { name: "Menu 1", price: 10, category: "Lunch" },
            { name: "Menu 2", price: 15, category: "Dinner" },
          ],
        },
      },
    });
  });

  afterAll(async () => {
    await prisma.menu.deleteMany();
    await prisma.vendor.deleteMany();
    if (httpServer && httpServer.listening) {
      await httpServer.close();
    }
    await prisma.$disconnect();
  });

  it("Fetch all vendors with their menus", async () => {
    const query = `
      query {
        vendors {
          id
          name
          menus {
            id
            name
            price
          }
        }
      }
    `;

    const response = await request(httpServer).post("/graphql").send({ query });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data.vendors");
    expect(response.body.data.vendors).not.toBeNull();
    expect(response.body.data.vendors.length).toBeGreaterThan(0);
    expect(response.body.data.vendors[0]).toHaveProperty("menus");
    expect(response.body.data.vendors[0].menus.length).toBeGreaterThan(0);
  });
});
