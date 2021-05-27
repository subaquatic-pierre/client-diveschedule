import { gql } from "@apollo/client";

export const MESSAGE_CACHE_QUERY = gql`
  query Messages {
    messages {
      error {
        message
      }
      success {
        message
      }
    }
  }
`;
