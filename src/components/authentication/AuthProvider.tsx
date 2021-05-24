import { ReactNode, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import { initAuth } from "../../controllers/auth";
// redux

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const client = useApolloClient();
  useEffect(() => {
    initAuth(client);
  }, [client]);
  return <>{children}</>;
}
