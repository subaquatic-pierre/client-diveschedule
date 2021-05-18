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

  const { themeMode, themeDirection } = settings;

  const isLight = themeMode === "light";

  const handleToggleTheme = useCallback(
    () =>
      client.writeQuery({
        query: SETTINGS_QUERY,
        data: {
          settings: {
            themeDirection,
            themeMode: isLight ? "dark" : "light",
          },
        },
      }),
    [client, themeDirection, isLight]
  );

  const handleChangeTheme = (event) => {
    return client.writeQuery({
      query: SETTINGS_QUERY,
      data: {
        settings: {
          themeDirection,
          themeMode: event.target.value,
        },
      },
    });
  };

  const handleChangeDirection = (event) =>
    client.writeQuery({
      query: SETTINGS_QUERY,
      data: {
        settings: {
          themeMode,
          themeDirection: event.target.value,
        },
      },
    });

  return {
    // Mode
    themeMode,
    toggleMode: handleToggleTheme,
    selectMode: handleChangeTheme,
    // Direction
    themeDirection,
    selectDirection: handleChangeDirection,
  };
}

export default useSettings;
