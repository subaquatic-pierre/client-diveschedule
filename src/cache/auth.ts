import { ApolloClient, gql } from "@apollo/client";

type User = {
  id: String;
  displayName: String;
  email: String;
  password: String;
  photoURL: null | String;
  isPublic: Boolean;
};

const AUTH_CACHE_QUERY = gql`
  query Auth {
    auth {
      isLoading
      isAuthenticated
      user {
        id
        displayName
        email
        password
        photoURL
        isPublic
      }
    }
  }
`;

const unAuthUser = {
  id: "",
  displayName: "",
  email: "",
  password: "",
  photoURL: null,
  isPublic: true,
};

type Auth = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User;
};

export type AuthCache = {
  auth: Auth;
};

const initialAuthState: AuthCache = {
  auth: {
    isLoading: false,
    isAuthenticated: false,
    user: unAuthUser,
  },
};

export const initAuth = (client: ApolloClient<any>): void => {
  try {
    //   Read query from client
    const settings = client.readQuery({
      query: AUTH_CACHE_QUERY,
    });

    // Query dies exist raise error
    if (!settings) throw new Error("There is no data in localStorage");
  } catch (error) {
    //   Write query to local storage
    client.writeQuery<AuthCache>({
      query: AUTH_CACHE_QUERY,
      data: initialAuthState,
    });
  }
};
