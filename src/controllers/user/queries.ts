import { gql } from "@apollo/client";

export const GET_USER_QUERY = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      email
      isAdmin
      profile {
        fullName
        certificationLevel
        equipment
      }
    }
  }
`;
