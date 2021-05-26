import { ReactNode } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import { AuthCache } from "../../controllers/auth";
import { AUTH_VIEWER_QUERY } from "../../controllers/auth";
import { loadingController } from "../../controllers/loading";

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const client = useApolloClient();
  const { setError, setLoading, clearError } = loadingController(client);
  const { loading, error } = useQuery<AuthCache>(AUTH_VIEWER_QUERY);
  if (error) setError(error.message);
  if (loading) setLoading(true);
  // if (data) {
  //   clearError();
  //   setLoading(false);
  // }
  return <>{children}</>;
}
