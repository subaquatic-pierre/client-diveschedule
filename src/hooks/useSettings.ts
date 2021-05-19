import { useApolloClient, useQuery } from "@apollo/client";
import {
  SETTINGS_CACHE_QUERY,
  SettingsCache,
  settingsController,
} from "../cache/controllers/settings";

// ----------------------------------------------------------------------

export default function useSettings() {
  const client = useApolloClient();
  const { data, error } = useQuery<SettingsCache>(SETTINGS_CACHE_QUERY);

  if (error) {
    throw new Error(`There was an error with settings query: ${error.message}`);
  }

  const { settings } = data;
  const { themeMode, themeDirection } = settings;

  const {
    handleToggleTheme,
    handleChangeTheme,
    handleChangeDirection,
  } = settingsController(client, settings);

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
