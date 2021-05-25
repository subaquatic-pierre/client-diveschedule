export type ThemeMode = "light" | "dark";
export type ThemeDirection = "rtl" | "ltr";

export type SettingsState = {
  themeMode: ThemeMode;
  themeDirection: ThemeDirection;
};

export type Settings = {
  __typename?: "Settings";
  themeMode?: ThemeMode;
  themeDirection?: ThemeDirection;
};

export type SettingsCache = {
  settings: Settings;
};
