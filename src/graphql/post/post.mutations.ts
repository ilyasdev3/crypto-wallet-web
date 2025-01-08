import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($post: PostInput!) {
    createPost(post: $post) {
      message
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($post: UpdatePostInput!) {
    updatePost(post: $post) {
      message
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId) {
      message
    }
  }
`;

export const DO_LIKE = gql`
  mutation DoLike($postId: ID!) {
    doLike(postId: $postId)
  }
`;
