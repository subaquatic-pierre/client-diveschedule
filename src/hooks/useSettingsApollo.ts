import { useCallback } from "react";
import { useApolloClient, gql } from "@apollo/client";

// ----------------------------------------------------------------------

type ThemeMode = "light" | "dark";
type ThemeDirection = "rtl" | "ltr";

export const SETTINGS_QUERY = gql`
  query Settings {
    settings {
      themeMode
      themeDirection
    }
  }
`;

function useSettings() {
  const client = useApolloClient();

  const { settings } = client.readQuery({
    query: SETTINGS_QUERY,
  });

  const { themeMode } = settings;

  const isLight = themeMode === "light";

  const handleToggleTheme = () =>
    client.writeQuery({
      query: SETTINGS_QUERY,
      data: {
        settings: {
          ...settings,
          themeMode: isLight ? "dark" : "light",
        },
      },
    });

  const handleChangeTheme = (event) =>
    client.writeQuery({
      query: SETTINGS_QUERY,
      data: {
        settings: {
          ...settings,
          themeMode: event.target.value,
        },
      },
    });

  const handleChangeDirection = (event) =>
    client.writeQuery({
      query: SETTINGS_QUERY,
      data: {
        settings: {
          ...settings,
          themeDirection: event.target.value,
        },
      },
    });

  return {
    toggleMode: handleToggleTheme,
    selectMode: handleChangeTheme,
    selectDirection: handleChangeDirection,
  };
}

export default useSettings;
