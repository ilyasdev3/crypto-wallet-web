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

export const UPDATE_USER = gql`
  mutation Mutation($user: UpdateUserInput!) {
    updateUser(user: $user)
  }
`;

export const FOLLOW_USER_UNFOLLOW_USER = gql`
  mutation Mutation($userId: ID!) {
    followUnfollowUser(userId: $userId)
  }
`;
