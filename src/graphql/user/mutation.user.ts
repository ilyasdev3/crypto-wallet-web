import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation Mutation($user: UserInput!) {
    createUser(user: $user) {
      message
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Mutation($user: UserInput!) {
    loginUser(user: $user) {
      message
      token
    }
  }
`;
