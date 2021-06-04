import { ApolloClient } from "@apollo/client";
import { deleteAuthToken } from "../utils/auth";
import { AuthCache, AuthController } from "../graphql/auth/";
import {
  LOGIN_MUTATION,
  CREATE_USER_MUTATION,
  LOGOUT_MUTATION,
  AUTH_VIEWER_QUERY,
} from "../graphql/auth";

import { defaultUser } from "../hooks/useAuth";
import { messageController } from "../controllers/messages";

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

export const authController = (client: ApolloClient<any>): AuthController => {
  const { setError, setSuccess } = messageController(client);
  // Login user
  const login = async ({ email, password }, history) => {
    try {
      const res = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: { email: email, password: password },
      });
      localStorage.setItem("token", res.data.tokenAuth.token);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  // Logout user
  const logout = async (history) => {
    try {
      await client.mutate({ mutation: LOGOUT_MUTATION });
      deleteAuthToken();
      setSuccess("Logout successful");
      history.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  // Create new user
  const register = async ({ email, password, firstName, lastName }) => {
    const fullName = `${firstName} ${lastName}`;
    try {
      await client.mutate({
        mutation: CREATE_USER_MUTATION,
        variables: {
          email: email,
          password: password,
          fullName: fullName,
        },
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const resetPassword = async (data: any) => {
    try {
    } catch (err) {}
  };

  return {
    login,
    logout,
    register,
    resetPassword,
  };
};
