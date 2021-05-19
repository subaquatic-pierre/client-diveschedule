import { useApolloClient, useQuery } from "@apollo/client";
import {
  AUTH_VIEWER_QUERY,
  initAuth,
  authController,
} from "../cache/controllers/auth";

// ----------------------------------------------------------------------

export default function useAuth() {
  const client = useApolloClient();
  const { data, loading, error } = useQuery(AUTH_VIEWER_QUERY);
  console.log(data);
  const { login, logout, register } = authController(client);

  return {
    login,
    logout,
    register,
  };
}
