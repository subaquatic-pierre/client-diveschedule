import React from "react";
import { AlertContext } from "../App";
import { useMutation } from "@apollo/client";

export const useBaseMutation = (gqlString: any, options?: any): any => {
  const { setAlert } = React.useContext(AlertContext);
  console.log(options);
  const defaultOptions = {
    onCompleted: (data: any) => {
      window.location.reload();
    },
    onError: (error: any) => {
      setAlert({
        state: true,
        severity: "error",
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
