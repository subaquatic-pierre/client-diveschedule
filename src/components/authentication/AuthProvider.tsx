import { ReactNode, useEffect } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import { AUTH_VIEWER_QUERY } from "../../cache/controllers/auth";
import useAuth from "../../hooks/useAuth.bak";
// redux

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const res = useAuth();

  return <>{children}</>;
}
