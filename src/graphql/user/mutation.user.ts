import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      message
      token
    }
  }
`;
