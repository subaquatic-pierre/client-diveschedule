import { ApolloClient, gql } from "@apollo/client";
import { SettingsController } from "./controllers";
import { updateClient } from "./index";

type ThemeMode = "light" | "dark";
type ThemeDirection = "rtl" | "ltr";

export type Settings = {
  __typename?: "Settings";
  themeMode?: ThemeMode;
  themeDirection?: ThemeDirection;
};

export type SettingsCache = {
  settings: Settings;
};

export const SETTINGS_CACHE_QUERY = gql`
  query Settings {
    settings {
      themeMode
      themeDirection
    }
  }
`;

export const initialSettings: SettingsCache = {
  settings: {
    __typename: "Settings",
    themeMode: "light",
    themeDirection: "ltr",
  },
};

export const initializeSettings = (client: ApolloClient<any>): void => {
  try {
    //   Read query from client
    const settings = client.readQuery({
      query: SETTINGS_CACHE_QUERY,
    });

    // Query dies exist raise error
    if (!settings) throw new Error("There is no data in localStorage");
  } catch (error) {
    //   Write query to local storage
    client.writeQuery<SettingsCache>({
      query: SETTINGS_CACHE_QUERY,
      data: initialSettings,
    });
  }
};

export const settingsController = (
  client: ApolloClient<any>,
  currentSettings: Settings
): SettingsController => {
  // Call root client update
  const updateSettings = (updatedData: Settings) => {
    const data: SettingsCache = {
      settings: {
        ...currentSettings,
        ...updatedData,
      },
    };
    updateClient(client, SETTINGS_CACHE_QUERY, data);
  };

  const isLight = currentSettings.themeMode === "light";

  //   Handler methods for settings
  const handleToggleTheme = () => {
    const newMode: Settings = {
      themeMode: isLight ? "dark" : "light",
    };
    updateSettings(newMode);
  };

  const handleChangeTheme = (event) => {
    const newMode: Settings = {
      themeMode: event.target.value,
    };
    updateSettings(newMode);
  };

  const handleChangeDirection = (event) => {
    const newDirection: Settings = {
      themeDirection: event.target.value,
    };
    updateSettings(newDirection);
  };

  return {
    handleToggleTheme,
    handleChangeTheme,
    handleChangeDirection,
  };
};
