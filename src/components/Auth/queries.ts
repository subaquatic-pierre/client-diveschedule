import { gql } from "@apollo/client";

export const AUTH_QUERY = gql`
  query AuthQuery {
    viewer {
      ... on UserType {
        email
        isAdmin
      }
    }
  }
`;
