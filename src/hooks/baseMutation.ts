import React from "react";
import { AlertContext } from "../App";
import { useMutation } from "@apollo/client";

interface IMutationOptions {
  onCompleted: () => void;
  onError: () => void;
}

export const useBaseMutation = (
  gqlString: any,
  options?: IMutationOptions
): any => {
  const { setAlert } = React.useContext(AlertContext);
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
