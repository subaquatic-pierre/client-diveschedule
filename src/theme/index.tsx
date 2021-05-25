import { useMemo, ReactNode } from "react";
// material
import { CssBaseline } from "@material-ui/core";
import {
  ThemeOptions,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import StyledEngineProvider from "@material-ui/core/StyledEngineProvider";
import { ThemeDirection } from "../@types/settings";
import shape from "./shape";
import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import GlobalStyles from "./globalStyles";
import componentsOverride from "./overrides";
import shadows, { customShadows } from "./shadows";
import useSettingsApollo from "../hooks/useSettings";

// ----------------------------------------------------------------------

type BaseThemeConfigProps = {
  children: ReactNode;
  isLight?: Boolean;
  themeDirection?: ThemeDirection;
};

type ThemeConfigProps = {
  children: ReactNode;
};

export const BaseTheme = ({
  children,
  isLight = true,
  themeDirection = "ltr",
}: BaseThemeConfigProps) => {
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: isLight
        ? { ...palette.light, mode: "light" }
        : { ...palette.dark, mode: "dark" },
      typography,
      shape,
      breakpoints,
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight, themeDirection]
  );

  const theme = createMuiTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default function ThemeConfig({ children }: ThemeConfigProps) {
  const { themeDirection, themeMode } = useSettingsApollo();

  const isLight = themeMode === "light";
  return (
    <BaseTheme isLight={isLight} themeDirection={themeDirection}>
      {children}
    </BaseTheme>
  );
}
