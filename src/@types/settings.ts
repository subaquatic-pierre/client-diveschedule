// ----------------------------------------------------------------------

type ThemeMode = "light" | "dark";
type ThemeDirection = "rtl" | "ltr";

export type SettingsState = {
  themeMode: ThemeMode;
  themeDirection: ThemeDirection;
};
