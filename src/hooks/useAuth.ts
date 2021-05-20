import { useApolloClient, useQuery } from "@apollo/client";
import {
  AUTH_VIEWER_QUERY,
  initAuth,
  authController,
} from "../cache/controllers/auth";

// ----------------------------------------------------------------------

export default function useAuth() {
  const client = useApolloClient();
  const { data, loading, error } = useQuery(AUTH_VIEWER_QUERY, {
    fetchPolicy: "cache-only",
  });
  if (!loading) {
    if (!data) {
      initAuth(client);
    }
  }
  const {
    viewer: { user },
  } = client.readQuery({
    query: AUTH_VIEWER_QUERY,
  });

  const { login, logout, register } = authController(client);

  const resetPassword = (data: any) => {};
  const updateProfile = (data: any) => {};
  const loginWithGoogle = () => {};
  const loginWithFaceBook = () => {};
  const loginWithTwitter = () => {};

  return {
    isLoading: loading,
    user,
    login,
    logout,
    register,
    resetPassword,
    updateProfile,
    loginWithGoogle,
    loginWithFaceBook,
    loginWithTwitter,
  };
}
