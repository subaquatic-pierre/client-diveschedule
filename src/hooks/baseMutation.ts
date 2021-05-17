import React from "react";
import { useMutation } from "@apollo/client";
import { Color } from "@material-ui/lab/Alert";
import { AlertContext } from "../App";

interface IMutationOptions {
  severity?: Color | undefined;
  onCompleted?: (data: any) => void | undefined;
  onError?: (error: any) => void | undefined;
}

export const useBaseMutation = (
  gqlString: any,
  options: IMutationOptions = {}
): any => {
  // const { setAlert } = React.useContext(AlertContext);
  const setAlert = (some: any) => {};

  // Set default options if any are not present on config object
  if (options.severity === undefined) {
    options.severity = "error";
  }
  if (options.onCompleted === undefined) {
    options.onCompleted = (data: any) => {
      window.location.reload();
    };
  }
  if (options.onError === undefined) {
    options.onError = (error: any) => {
      setAlert({
        state: true,
        severity: options.severity,
        message: error.message,
      });
    };
  }

  const [mutation, { data, error, loading }] = useMutation(gqlString, options);
  return { mutation, data, error, loading };
};
