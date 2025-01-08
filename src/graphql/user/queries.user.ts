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
      coverImage
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

export const GET_TOP_USERS = gql`
  query GetTopUsers {
    getTopUsers(limit: 5) {
      id
      username
      firstName
      lastName
      profileImage
      bio
      isVerified
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query me {
    me {
      id
      username
      profileImage
      firstName
      lastName
      email
      bio
      createdAt
      updatedAt
      following
      followers
    }
  }
`;
export const GET_USER_BY_ID = gql`
  query GetUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      id
      username
      profileImage
      firstName
      lastName
      email
      bio
      createdAt
      updatedAt
      following
      followers
    }
  }
`;
export const GET_USER_FOLLOWERS = gql`
  query GetUserFollowers($getUserFollowersId: ID!) {
    getUserFollowers(id: $getUserFollowersId) {
      id
      username
      profileImage
      firstName
      lastName
      email
      bio
      createdAt
      updatedAt
      following
      followers
    }
  }
`;

export const GET_USER_FOLLOWING = gql`
  query GetUserFollowing($getUserFollowingId: ID!) {
    getUserFollowing(id: $getUserFollowingId) {
      id
      username
      profileImage
      firstName
      lastName
      email
      bio
      createdAt
      updatedAt
      following
      followers
    }
  }
`;
