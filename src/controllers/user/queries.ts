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
