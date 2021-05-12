import React from "react";
import { makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { AlertContext, initialAlert } from "../../App";

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
    width: "70%",
  },
}));

export const Message: React.FC = () => {
  const context = React.useContext(AlertContext);
  const classes = useStyles();
  const {
    alert: { severity, message },
    setAlert,
  } = context;
  return (
    <Alert
      className={classes.alert}
      onClose={() => setAlert(initialAlert)}
      severity={severity}
    >
      {message}
    </Alert>
  );
};
