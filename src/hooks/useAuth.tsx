import { useApolloClient, useQuery } from "@apollo/client";
import { AUTH_VIEWER_QUERY, authController } from "../cache/controllers/auth";
import { useSnackbar } from "notistack";
import { Icon } from "@iconify/react";
import closeFill from "@iconify/icons-eva/close-fill";
import { MIconButton } from "../components/@material-extend";
import buildUser from "../utils/buildUser";

// ----------------------------------------------------------------------

export default function useAuth() {
  const client = useApolloClient();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { data, loading, error } = useQuery(AUTH_VIEWER_QUERY);

  let user = buildUser();

  if (!loading && !error) {
    const { viewer } = data;
    user = buildUser(viewer);
  }

  if (error) {
    enqueueSnackbar("Login error", {
      variant: "error",
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      ),
    });
  }

  const {
    login,
    logout,
    register,
    resetPassword,
    updateProfile,
  } = authController(client);

  return {
    isAuthenticated: true,
    isLoading: loading,
    user: user,
    login,
    logout,
    register,
    resetPassword,
    updateProfile,
  };
}
