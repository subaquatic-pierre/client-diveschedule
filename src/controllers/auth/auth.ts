import { ApolloClient } from "@apollo/client";
import { deleteAuthToken } from "../../utils/auth";
import { AuthCache, AuthController } from "./types";
import {
  LOGIN_MUTATION,
  CREATE_USER_MUTATION,
  LOGOUT_MUTATION,
  AUTH_VIEWER_QUERY,
} from "./queries";

import { defaultUser } from "../user";
import { messagesController } from "../messages";

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
  const { setError, setSuccess } = messagesController(client);
  // Login user
  const login = ({ email, password }, history) => {
    client
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: { email: email, password: password },
      })
      .then((res) => {
        localStorage.setItem("token", res.data.tokenAuth.token);
        setSuccess("Login success");
        history.push("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // Logout user
  const logout = (history) => {
    client
      .mutate({ mutation: LOGOUT_MUTATION })
      .then((res) => {
        deleteAuthToken();
        setSuccess("Logout successful");
        history.push("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // Create new user
  const register = ({ email, password, firstName, lastName }) => {
    const fullName = `${firstName} ${lastName}`;
    client
      .mutate({
        mutation: CREATE_USER_MUTATION,
        variables: {
          email: email,
          password: password,
          fullName: fullName,
        },
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const resetPassword = (data: any) => {};

  return {
    login,
    logout,
    register,
    resetPassword,
  };
};
