import { ApolloClient, DocumentNode } from "@apollo/client";
import { deleteAuthToken } from "../../utils/auth";
import { AuthController } from "../../@types/controllers";
import {
  Auth,
  AuthCache,
  LoginParams,
  RegisterParams,
} from "../../@types/user";
import {
  LOGIN_MUTATION,
  CREATE_USER_MUTATION,
  LOGOUT_MUTATION,
  AUTH_VIEWER_QUERY,
} from "./queries";
import { defaultUser } from "../user";

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
  // Login user
  const login = async ({ email, password }: LoginParams) => {
    const response = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email: email, password: password },
    });

    if (response.data) {
      localStorage.setItem("token", response.data.tokenAuth.token);
    }

    if (response.errors) {
      return new Error(response.errors[0].message);
    }
    window.location.reload();
  };

  // Logout user
  const logout = async () => {
    deleteAuthToken();
    await client.mutate({ mutation: LOGOUT_MUTATION });
    window.location.reload();
  };

  // Create new user
  const register = async ({
    email,
    password,
    firstName,
    lastName,
  }: RegisterParams) => {
    const fullName = `${firstName} ${lastName}`;
    await client.mutate({
      mutation: CREATE_USER_MUTATION,
      variables: {
        email: email,
        password: password,
        fullName: fullName,
      },
    });
    window.location.reload();
  };

  const resetPassword = (data: any) => {};
  const updateProfile = (data: any) => {
    console.log(data);
  };

  return {
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
  };
};
