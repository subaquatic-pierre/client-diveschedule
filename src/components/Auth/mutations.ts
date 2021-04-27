import { gql } from "@apollo/client";

export const REFRESH_TOKEN = gql`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      payload
    }
  }
`;

export const VERIFY_TOKEN = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`;

export const DELETE_AUTH_TOKEN = gql`
  mutation DeleteAuthToken {
    deleteTokenCookie {
      deleted
    }
  }
`;
