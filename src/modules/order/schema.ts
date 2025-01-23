const orderSchema = `
  enum OrderStatus {
    PENDING
    COMPLETED
    CANCELLED
  }

  type Order {
    id: Int!
    userId: Int!
    menu_id: Int!
    quantity: Int!
    status: OrderStatus!
    created_at: String!
    user: User!
    menu: Menu!
  }

  input CreateOrderInput {
    userId: Int!
    menu_id: Int!
    quantity: Int!
    status: OrderStatus = PENDING
  }

  type Query {
    orders: [Order!]!
    userOrders(userId: Int!): [Order!]!
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order!
    updateOrderStatus(id: Int!, status: OrderStatus!): Order!
  }
`;

export default orderSchema;
