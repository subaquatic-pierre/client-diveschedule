import { gql } from "@apollo/client";

export const DELETE_AUTH_TOKEN = gql`
  mutation DeleteAuthToken {
    deleteTokenCookie {
      deleted
    }
  }
`;
