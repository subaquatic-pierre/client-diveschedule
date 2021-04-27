import React from "react";
import { CssBaseline, ThemeProvider, Container } from "@material-ui/core";

import { Header } from "../Header/Header";
import { Footer } from "../Footer";
import theme from "../../theme";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container maxWidth="xl">{children}</Container>
        <Footer />
      </ThemeProvider>
    </>
  );
};
