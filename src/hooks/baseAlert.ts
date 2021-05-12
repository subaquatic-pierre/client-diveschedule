import React from "react";
import { AlertContext, IAlertContext, initialAlert } from "../App";

export const useBaseAlert = (): IAlertContext => {
  const context = React.useContext(AlertContext);
  try {
    const {
      alert: { state, message },
      setAlert,
    } = context;
    return {
      alert: { state, severity: "error", message },
      setAlert,
    };
  } catch (error) {
    return {
      alert: initialAlert,
      setAlert: () => {},
    };
  }
};
