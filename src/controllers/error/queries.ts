import { gql } from "@apollo/client";

export const ERROR_QUERY = gql`
  query Error {
    error {
      message
    }
  }
`;

export const SUCCESS_QUERY = gql`
  query Success {
    success {
      message
    }
  }
`;
