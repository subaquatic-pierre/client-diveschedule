import React from "react";
import {
  CssBaseline,
  ThemeProvider,
  Container,
  makeStyles
} from "@material-ui/core";
import { useBaseAlert } from "../../hooks";
import { Message } from "../Message";

import { Header } from "../Header/Header";
import { Footer } from "../Footer";
import theme from "../../theme";

const useStyles = makeStyles((theme) => ({
  alertContainer: {
    position: "absolute",
    zIndex: theme.zIndex.modal,
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  alert: {
    position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
    width: "70%"
  }
}));

export const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  const {
    alert: { state }
  } = useBaseAlert();
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        {state && (
          <div className={classes.alertContainer}>
            <Message />
          </div>
        )}
        <Container maxWidth="xl">{children}</Container>
        <Footer />
      </ThemeProvider>
    </>
  );
};
