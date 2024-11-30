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
