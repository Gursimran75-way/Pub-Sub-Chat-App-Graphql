import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query Query {
    users {
      name
      createdAt
      email
      id
      isActive
      updatedAt
    }
  }
`;

export const GET_USERS_MESSAGES = gql`
  query Query($input: chatMessagesInput!) {
    chatMessages(input: $input) {
      content
      sender {
        id
        name
        email
      }
      receiver {
        id
        name
        email
      }
      createdAt
      id
    }
  }
`;
