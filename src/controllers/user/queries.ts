import { gql } from "@apollo/client";

const UserFragment = gql`
  fragment UserFragment on UserType {
    email
    password
    profile {
      fullName
      certLevel
      equipment
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query UserProfile($id: ID!) {
    userProfile(userId: $id) {
      email
      fullName
      certLevel
      phoneNumber
      equipment
    }
  }
`;

export const USER_LIST_QUERY = gql`
  query UserListQuery {
    allUsers {
      edges {
        node {
          id
          email
          password
          profile {
            fullName
            certLevel
            phoneNumber
            equipment
          }
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
        id
        email
        profile {
          fullName
          email
        }
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
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
        id
        email
        profile {
          fullName
          email
          certLevel
          phoneNumber
          equipment
        }
      }
    }
  }
`;
