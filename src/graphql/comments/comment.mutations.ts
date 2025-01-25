import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation CreateComment($comment: CommentInput!) {
    createComment(comment: $comment) {
      message
      comment {
        id
        content
        createdAt
        user {
          id
          username
          profileImage
        }
      }
    }
  }
`;
