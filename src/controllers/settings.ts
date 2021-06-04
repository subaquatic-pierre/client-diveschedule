import { ApolloClient } from "@apollo/client";
import { updateClient } from "../graphql/index";
import { SETTINGS_CACHE_QUERY } from "../graphql/settings/queries";
import { Settings, SettingsCache } from "../graphql/settings/types";
import { SettingsController } from "../@types/controllers";

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
  const _updateSettings = (updatedData: Settings) => {
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
    _updateSettings(newMode);
  };

  const handleChangeTheme = (event) => {
    const newMode: Settings = {
      themeMode: event.target.value,
    };
    _updateSettings(newMode);
  };

  const handleChangeDirection = (event) => {
    const newDirection: Settings = {
      themeDirection: event.target.value,
    };
    _updateSettings(newDirection);
  };

  return {
    handleToggleTheme,
    handleChangeTheme,
    handleChangeDirection,
  };
};
