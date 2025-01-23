const vendorSchema = `
type Mutation {
  createVendor(input: CreateVendorInput!): Vendor!
}

input CreateVendorInput {
  name: String!
  email: String!
  phone: String
  address: String
}

type Vendor {
  id: Int!
  name: String!
  email: String!
  phone: String!
  address: String!
  created_at: String!
  menus: [Menu!]!  # Ensure this field is non-nullable
}

type Menu {
  id: Int!
  vendor_id: Int!
  name: String!
  price: Float!
  category: String!
  is_available: Boolean!
}
  
type Query {
  vendors(page: Int, pageSize: Int): [Vendor!]!  # Ensure non-nullable list
}
`;

export default vendorSchema;
