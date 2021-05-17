import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation TokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
      payload
      refreshExpiresIn
    }
  }
`;
