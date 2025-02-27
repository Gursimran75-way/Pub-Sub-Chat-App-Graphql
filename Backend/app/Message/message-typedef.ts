import { gql } from "apollo-server-express";

export const messageTypeDef = gql`
  type Message {
    content: String!
    sender: UserObj!
    receiver: UserObj!
    createdAt: String!
    id: ID!
  }

  type UserObj {
    id: ID!
    name: String!
    email: String!
  }

  input chatMessagesInput {
    receiverId: String!
  }

  input MutationInput {
    receiverId: String!
    content: String!
  }

  type Query {
    chatMessages(input: chatMessagesInput!): [Message]
  }

  type Mutation {
    createMessage(input: MutationInput!): Message!
  }

  type Subscription {
    messageSent: Message!
  }
`;
