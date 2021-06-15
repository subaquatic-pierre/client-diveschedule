import { ThemeDirection, ThemeMode } from "../../@types/settings";

export type Settings = {
  __typename?: "Settings";
  themeMode?: ThemeMode;
  themeDirection?: ThemeDirection;
};

export type SettingsCache = {
  settings: Settings;
};
