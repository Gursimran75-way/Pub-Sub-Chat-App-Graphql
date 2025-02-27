import { gql } from "apollo-server-express";

export const userTypeDef = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }



  input SignupInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Token {
    accessToken: String!
    refreshToken: String!
    loggedInUser: User!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    signup(input: SignupInput!): User!
    login(input: LoginInput!): Token!
  }
`;
