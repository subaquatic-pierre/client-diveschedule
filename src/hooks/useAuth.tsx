import { useApolloClient, useQuery } from "@apollo/client";
import { AUTH_VIEWER_QUERY } from "../controllers/auth/queries";
import { defaultUser } from "../controllers/user/user";
import { User } from "../@types/user";
import { messagesController } from "../controllers/messages";

// ----------------------------------------------------------------------

const replaceIfNull = (value: string | null): string => {
  if (value === null || value === undefined) {
    return "Default";
  }
  return value;
};

const buildUser = (viewer: User = defaultUser) => {
  const {
    id,
    isAdmin,
    email,
    profile: { fullName, photoURL, certificationLevel, equipment },
  } = viewer;
  return {
    ...defaultUser,
    id,
    email,
    isAdmin,
    profile: {
      fullName: replaceIfNull(fullName),
      role: isAdmin ? "admin" : "user",
      photoURL: replaceIfNull(photoURL),
      certificationLevel: replaceIfNull(certificationLevel),
      equipment: replaceIfNull(equipment),
      phoneNumber: replaceIfNull(viewer.profile.phoneNumber),
    },
  };
};

export default function useAuth() {
  const client = useApolloClient();
  const { setError } = messagesController(client);
  const { data, loading, error } = useQuery(AUTH_VIEWER_QUERY, {
    fetchPolicy: "network-only",
  });

  let user = buildUser();

  if (!loading && !error) {
    const { viewer } = data;
    user = buildUser(viewer);
  }

  if (error) {
    setError(error.message);
  }

  return {
    isAuthenticated: user.id !== "AnonymousUser",
    loading: loading,
    user: user,
  };
}
