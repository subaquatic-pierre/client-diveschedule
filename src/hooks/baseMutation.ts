import React from "react";
import { useBaseAlert } from "./baseAlert";
import { useMutation } from "@apollo/client";
import { Color } from "@material-ui/lab/Alert";
import { AlertContext, IAlertContext, initialAlert } from "../App";

interface IMutationOptions {
  severity: Color | undefined;
  onCompleted: () => void;
  onError: () => void;
}

export const useBaseMutation = (
  gqlString: any,
  severity = "error" as Color,
  options?: IMutationOptions
): any => {
  const context = React.useContext(AlertContext);
  const { setAlert } = context;
  const defaultOptions = {
    onCompleted: (data: any) => {
      window.location.reload();
    },
    onError: (error: any) => {
      setAlert({
        state: true,
        severity: severity,
        message: error.message,
      });
    },
  };
  const [mutation, { data, error, loading }] = useMutation(
    gqlString,
    options ? options : defaultOptions
  );
  return { mutation, data, error, loading };
};
