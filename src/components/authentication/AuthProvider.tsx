import { ReactNode, useEffect } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import { initAuth } from "../../controllers/auth/auth";
import { errorController, ERROR_QUERY } from "../../controllers/error";
import { useSnackbar } from "notistack";

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const client = useApolloClient();
  const { clearError } = errorController(client);
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useQuery(ERROR_QUERY);
  useEffect(() => {
    initAuth(client);
  }, [client]);

  useEffect(() => {
    if (data) {
      const {
        error: { message },
      } = data;
      if (message) enqueueSnackbar(message, { variant: "error" });
    }
  }, [data, enqueueSnackbar]);

  useEffect(() => {
    clearError();
  }, [clearError]);
  return <>{children}</>;
}
