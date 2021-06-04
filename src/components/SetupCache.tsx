import { useApolloClient, ApolloClient } from "@apollo/client";
import { initSettings } from "../controllers/settings";
import { initMessages } from "../controllers/messages";
import { defaultUser } from "../hooks/useAuth";
import { AUTH_VIEWER_QUERY, AuthCache } from "../graphql/auth";

const initialAuthState: AuthCache = {
  viewer: {
    isAuthenticated: false,
    user: defaultUser,
  },
};

export const initAuth = (client: ApolloClient<any>): void => {
  try {
    //   Read query from client
    const res = client.readQuery({
      query: AUTH_VIEWER_QUERY,
    });
    // Query dies exist raise error
    if (!res) throw new Error("There is no data in localStorage");
  } catch (error) {
    //   Write query to local storage
    client.writeQuery<AuthCache>({
      query: AUTH_VIEWER_QUERY,
      data: initialAuthState,
    });
  }
};

export default function SetupCache() {
  const client = useApolloClient();

  initSettings(client);
  initAuth(client);
  initMessages(client);
  return <></>;
}
