import { gql } from "@apollo/client";

export const SETTINGS_CACHE_QUERY = gql`
  query Settings {
    settings {
      themeMode
      themeDirection
    }
  }
`;
