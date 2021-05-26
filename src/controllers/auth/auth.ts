import { ApolloClient, DocumentNode } from "@apollo/client";
import { deleteAuthToken } from "../../utils/auth";
import {
  Auth,
  AuthCache,
  AuthController,
  LoginParams,
  RegisterParams,
} from "./types";
import {
  LOGIN_MUTATION,
  CREATE_USER_MUTATION,
  LOGOUT_MUTATION,
  AUTH_VIEWER_QUERY,
} from "./queries";

import { defaultUser } from "../user";
import { loadingController } from "../loading";

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

export const authController = (
  client: ApolloClient<any>,
  mutation?: DocumentNode,
  data?: Auth
): AuthController => {
  const { setError } = loadingController(client);
  // Login user
  const login = ({ email, password }: LoginParams) => {
    client
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: { email: email, password: password },
      })
      .then((res) => {
        localStorage.setItem("token", res.data.tokenAuth.token);
        window.location.reload();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // Logout user
  const logout = () => {
    client
      .mutate({ mutation: LOGOUT_MUTATION })
      .then((res) => {
        deleteAuthToken();
        window.location.reload();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // Create new user
  const register = ({
    email,
    password,
    firstName,
    lastName,
  }: RegisterParams) => {
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
