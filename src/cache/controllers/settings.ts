import { ApolloClient, gql } from "@apollo/client";
import { SettingsController } from "../../@types/controllers";
import { updateClient } from "../../controllers/index";

export type ThemeMode = "light" | "dark";
export type ThemeDirection = "rtl" | "ltr";

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

export const initialSettingsState: SettingsCache = {
  settings: {
    __typename: "Settings",
    themeMode: "light",
    themeDirection: "ltr",
  },
};

export const initSettings = (client: ApolloClient<any>): void => {
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
      data: initialSettingsState,
    });
  }
};

export const settingsController = (
  client: ApolloClient<any>,
  data?: Settings
): SettingsController => {
  // Call root client update
  const updateSettings = (updatedData: Settings) => {
    const newData: SettingsCache = {
      settings: {
        ...data,
        ...updatedData,
      },
    };
    updateClient(client, SETTINGS_CACHE_QUERY, newData);
  };

  const isLight = data.themeMode === "light";

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
