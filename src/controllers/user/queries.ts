import { gql } from "@apollo/client";

const UserFragment = gql`
  fragment UserFragment on UserType {
    email
    password
    profile {
      fullName
      certificationLevel
      equipment
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query UserProfile($id: ID!) {
    userProfile(userId: $id) {
      email
      fullName
      certificationLevel
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
            certificationLevel
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
    $fullName: String
    $email: String
    $certLevel: String
    $equipment: String
  ) {
    createUser(
      fullName: $fullName
      email: $email
      certLevel: $certLevel
      equipment: $equipment
    ) {
      dummy
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $fullName: String
    $email: String
    $certLevel: String
    $equipment: String
  ) {
    updateProfile(
      fullName: $fullName
      email: $email
      certLevel: $certLevel
      equipment: $equipment
    ) {
      dummy
    }
  }
`;
