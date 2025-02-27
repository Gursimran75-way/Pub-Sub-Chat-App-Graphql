import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation Mutation($input: SignupInput!) {
    signup(input: $input) {
      createdAt
      email
      id
      isActive
      name
      updatedAt
    }
  }
`;

export const LOGIN = gql`
mutation Mutation($input: LoginInput!) {
  login(input: $input) {
    accessToken
    refreshToken
    loggedInUser {
      id
      name
      email
      isActive
      createdAt
      updatedAt
    }
  }
}
`;

export const CREATE_NEW_MESSAGE = gql`
  mutation CreateMessage($input: MutationInput!) {
    createMessage(input: $input) {
      content
      createdAt
      id
      receiver {
        id
        name
        email
      }
      sender {
        id
        name
        email
      }
    }
  }
`;
