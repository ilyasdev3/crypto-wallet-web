import { gql } from "@apollo/client";

export const GET_USER = gql`
  query Query {
    me {
      address
      bio
      createdAt
      email
      firstName
      followers
      following
      id
      isVerified
      lastName
      phone
      profileImage
      updatedAt
      username
    }
  }
`;

export const GET_USER_WITH_NAME = gql`
  query Query($username: String!) {
    getUserWithName(username: $username) {
      message
      user {
        username
        address
        firstName
        lastName
      }
    }
  }
`;
