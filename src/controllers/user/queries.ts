import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      profile {
        email
        fullName
        certificationLevel
        equipment
      }
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
