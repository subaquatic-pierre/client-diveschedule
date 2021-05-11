import React from "react";
import {
  CssBaseline,
  ThemeProvider,
  Container,
  makeStyles,
} from "@material-ui/core";
import { AlertContext, initialAlert } from "../../App";
import Alert from "@material-ui/lab/Alert";

import { Header } from "../Header/Header";
import { Footer } from "../Footer";
import theme from "../../theme";

const useStyles = makeStyles((theme) => ({
  alertContainer: {
    position: "absolute",
    zIndex: theme.zIndex.modal,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  alert: {
    position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  },
}));

export const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  const {
    alert: { state, severity, message },
    setAlert,
  } = React.useContext(AlertContext);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        {state && (
          <div className={classes.alertContainer}>
            <Alert
              className={classes.alert}
              onClose={() => setAlert(initialAlert)}
              severity={severity}
            >
              {message}
            </Alert>
          </div>
        )}
        <Container maxWidth="xl">{children}</Container>
        <Footer />
      </ThemeProvider>
    </>
  );
};
