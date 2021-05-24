import { useApolloClient, useQuery } from "@apollo/client";
import { AUTH_VIEWER_QUERY, authController } from "../controllers/auth";
import { useSnackbar } from "notistack";
import { Icon } from "@iconify/react";
import closeFill from "@iconify/icons-eva/close-fill";
import { MIconButton } from "../components/@material-extend";
import { defaultUser } from "../controllers/user";
import { User } from "../@types/user";

// ----------------------------------------------------------------------

const buildUser = (viewer: User = defaultUser) => ({
  ...defaultUser,
  id: viewer.id,
  email: viewer.email,
  profile: {
    ...viewer.profile,
    role: viewer.isAdmin ? "admin" : "user",
    photoURL: viewer.profile.photoURL || "",
  },
});

export default function useAuth() {
  const client = useApolloClient();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { data, loading, error } = useQuery(AUTH_VIEWER_QUERY, {
    fetchPolicy: "network-only",
  });

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
    isAuthenticated: user.id !== "AnonymousUser",
    isLoading: loading,
    user: user,
    login,
    logout,
    register,
    resetPassword,
    updateProfile,
  };
}
