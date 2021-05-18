import { useReducer } from "react";
import { SettingsState } from "../@types/settings";
import settingsReducer from "../store/reducers/settings";

export const initialState: SettingsState = {
  themeMode: "light",
  themeDirection: "ltr",
};

function useSettings() {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  const { themeMode, themeDirection } = state;
  const isLight = themeMode === "light";

  const handleToggleTheme = () =>
    dispatch({ type: "switchMode", payload: isLight ? "dark" : "light" });

  const handleChangeTheme = (event) =>
    dispatch({ type: "switchMode", payload: event.target.value });

  const handleChangeDirection = (event) =>
    dispatch({ type: "switchDirection", payload: event.target.value });

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
