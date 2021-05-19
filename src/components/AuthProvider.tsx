import { ReactNode, useEffect } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { AUTH_VIEWER_QUERY } from "../cache/controllers/auth";
import useAuth from "../hooks/useAuthApollo";
// redux

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const res = useAuth();

  return <>{children}</>;
}
