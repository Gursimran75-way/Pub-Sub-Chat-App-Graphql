import { gql } from "@apollo/client";

export const MESSAGE_SENT = gql`
subscription Subscription {
    messageSent {
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