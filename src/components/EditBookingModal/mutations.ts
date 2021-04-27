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

export const CREATE_USER = gql`
  ${UserFragment}
  mutation CreateUser(
    $fullName: String
    $email: String
    $certificationLevel: String
    $equipment: String
  ) {
    createUser(
      fullName: $fullName
      email: $email
      certificationLevel: $certificationLevel
      equipment: $equipment
    ) {
      user {
        ...UserFragment
      }
    }
  }
`;

export const EDIT_USER = gql`
  ${UserFragment}
  mutation EditUser(
    $id: ID!
    $fullName: String
    $email: String
    $certificationLevel: String
    $equipment: String
  ) {
    editUser(
      id: $id
      fullName: $fullName
      email: $email
      certificationLevel: $certificationLevel
      equipment: $equipment
    ) {
      user {
        ...UserFragment
      }
    }
  }
`;
