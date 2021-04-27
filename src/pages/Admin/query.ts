import { gql } from "@apollo/client";

export const USERS_QUERY = gql`
  query {
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
