import { gql } from 'apollo-server-express';
import userSchema from './user/schema';
import userResolvers from './user/resolvers';
import vendorSchema from './vendor/schema';
import vendorResolvers from './vendor/resolvers';
import menuSchema from './menu/schema';
import menuResolvers from './menu/resolvers';
import orderSchema from './order/schema';
import orderResolvers from './order/resolvers';

export const typeDefs = gql`
  ${userSchema}
  ${vendorSchema}
  ${menuSchema}
  ${orderSchema}
`;

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...vendorResolvers.Query,
    ...menuResolvers.Query,
    ...orderResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...vendorResolvers.Mutation,
    ...menuResolvers.Mutation,
    ...orderResolvers.Mutation,
  },
};
