import { gql } from "@apollo/client";

export const GET_USER_POSTS = gql`
  query GetUserPosts($getUserPostsId: ID!) {
    getUserPosts(id: $getUserPostsId) {
      id
      image
      isVerified
      likes
      stats {
        totalShares
        totalLikes
        totalComments
      }
      title
      updatedAt
      userId {
        username
        profileImage
        lastName
        firstName
      }

      content
      createdAt
    }
  }
`;

export const GET_POST = gql`
  query GetPost($getPost: ID!) {
    getPost(id: $getPost) {
      id
      title
      content
      userId {
        id
        firstName
        lastName
        username
        profileImage
      }
      likes
      stats {
        totalLikes
        totalComments
        totalShares
      }
      image
    }
  }
`;
export const GET_ALL_POSTS = gql`
  query GetAllPosts($filters: PostFilter) {
    getAllPosts(filters: $filters) {
      id
      title
      content
      createdAt
      updatedAt
      image
      userId {
        id
        firstName
        lastName
        username
        profileImage
      }
      likes
      stats {
        totalLikes
        totalComments
        totalShares
      }
    }
  }
`;

export const GET_USER_FOLLOWING_POSTS = gql`
  query Query {
    getFollowingPosts {
      likes
      content
      userId {
        lastName
        firstName
        profileImage
        username
      }
      image
    }
  }
`;
