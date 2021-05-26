import { gql } from "@apollo/client";

export const LOADING_CACHE_QUERY = gql`
  query Loading {
    loading {
      state
      error {
        message
      }
      success {
        message
      }
    }
  }
`;
