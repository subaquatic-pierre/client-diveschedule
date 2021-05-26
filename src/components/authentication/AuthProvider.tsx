import { ReactNode, useEffect } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import { initAuth } from "../../controllers/auth/auth";
import {
  errorController,
  ERROR_QUERY,
  SUCCESS_QUERY,
} from "../../controllers/error";
import { useSnackbar } from "notistack";

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const client = useApolloClient();
  const { clearError, clearSuccess } = errorController(client);
  const { enqueueSnackbar } = useSnackbar();
  const { data: errorData } = useQuery(ERROR_QUERY);
  const { data: successData } = useQuery(SUCCESS_QUERY);
  useEffect(() => {
    initAuth(client);
  }, [client]);

  useEffect(() => {
    // Handle error data
    if (errorData) {
      const {
        error: { message },
      } = errorData;
      if (message) enqueueSnackbar(message, { variant: "error" });
    }

    // Handle success Data
    if (successData) {
      const {
        success: { message },
      } = successData;
      if (message) enqueueSnackbar(message, { variant: "success" });
    }
  }, [successData, errorData, enqueueSnackbar]);

  useEffect(() => {
    clearError();
    clearSuccess();
  }, [clearError, clearSuccess]);
  return <>{children}</>;
}
