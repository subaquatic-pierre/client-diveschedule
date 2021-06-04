import { gql } from "@apollo/client";

export const profileFragment = gql`
  fragment ProfileFragment on ProfileType {
    email
    fullName
    certLevel
    equipment
    phoneNumber
  }
`;

export const userFragment = gql`
  ${profileFragment}
  fragment UserFragment on UserType {
    id
    profile {
      ...ProfileFragment
    }
  }
`;
