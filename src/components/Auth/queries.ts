import { gql } from "@apollo/client";

export const AUTH_QUERY = gql`
  query AuthQuery {
    user: viewer {
      ... on UserType {
        email
        isStaff
      }
    }
    anon: viewer {
      ... on AnonUserType {
        email
        isStaff
      }
    }
  }
`;
