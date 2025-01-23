const userSchema = `
  type User {
    id: Int!
    name: String!
    email: String!
    phone: String!
    created_at: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
    phone: String!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
  }
`;

export default userSchema;
