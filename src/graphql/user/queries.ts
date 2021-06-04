import { gql } from "@apollo/client";
import { profileFragment, userFragment } from "./fragments";

export const GET_USER_PROFILE = gql`
  ${profileFragment}
  query UserProfile($id: ID!) {
    userProfile(userId: $id) {
      ...ProfileFragment
    }
  }
`;

export const USER_LIST_QUERY = gql`
  ${userFragment}
  query UserListQuery {
    allUsers {
      edges {
        node {
          ...UserFragment
        }
      }
    }
  }
`;

export const DELETE_USERS = gql`
  mutation DeleteUsers($ids: [ID]!) {
    deleteUsers(ids: $ids) {
      deleted
      ids
    }
  }
`;

export const CREATE_USER = gql`
  ${userFragment}
  mutation CreateUser(
    $email: String!
    $fullName: String
    $certLevel: String
    $equipment: String
    $phoneNumber: String
  ) {
    createUser(
      email: $email
      fullName: $fullName
      certLevel: $certLevel
      equipment: $equipment
      phoneNumber: $phoneNumber
    ) {
      user {
        ...UserFragment
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  ${userFragment}
  mutation UpdateProfile(
    $userId: ID!
    $fullName: String
    $email: String
    $certLevel: String
    $equipment: String
    $phoneNumber: String
  ) {
    updateProfile(
      userId: $userId
      fullName: $fullName
      email: $email
      certLevel: $certLevel
      phoneNumber: $phoneNumber
      equipment: $equipment
    ) {
      user {
        ...UserFragment
      }
    }
  }
`;

export const SEARCH_USERS = gql`
  query SearchUsers($fullName: String!) {
    searchUsers(fullName: $fullName, first: 6) {
      edges {
        node {
          id
          profile {
            fullName
            certLevel
            equipment
          }
        }
      }
    }
  }
`;
