import { gql } from "@apollo/client";

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
