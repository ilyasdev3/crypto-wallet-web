import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
  query GetComments($id: ID!) {
    getComments(id: $id) {
      content
      createdAt
      id
      postId
      updatedAt
      user {
        profileImage
        firstName
        lastName
      }
    }
  }
`;
