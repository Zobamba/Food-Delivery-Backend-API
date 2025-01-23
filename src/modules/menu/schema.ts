const menuSchema = `
  type Menu {
    id: Int!
    vendor_id: Int!
    name: String!
    price: Float!
    category: String!
    is_available: Boolean!
    vendor: Vendor!
  }

  input CreateMenuInput {
    vendor_id: Int!
    name: String!
    price: Float!
    category: String!
    is_available: Boolean!
  }

  type Query {
    menus: [Menu!]!
    menu(id: Int!): Menu
  }

  type Mutation {
    createMenu(input: CreateMenuInput!): Menu!
  }
`;

export default menuSchema;
