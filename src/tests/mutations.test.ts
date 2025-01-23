import request from "supertest";
import { httpServer } from "../index";

describe("GraphQL Mutations", () => {
  afterAll(async () => {
    if (httpServer && httpServer.listening) {
      await httpServer.close();
    }
  });

  it("Add a new vendor", async () => {
    const mutation = `
      mutation {
        createVendor(
          input: {
            name: "New Vendor", 
            email: "newvendor@example.com", 
            phone: "9876543210", 
            address: "456 New Street"
          }
        ) {
          id
          name
          email
        }
      }
    `;

    const response = await request(httpServer)
      .post("/graphql")
      .send({ query: mutation });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data.createVendor");
    expect(response.body.data.createVendor).not.toBeNull();
    expect(response.body.data.createVendor.name).toBe("New Vendor");
    expect(response.body.data.createVendor.email).toBe("newvendor@example.com");
  });
});
