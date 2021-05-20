import { ApolloClient, DocumentNode, gql } from "@apollo/client";
import { deleteAuthToken } from "../../utils/auth";
import { AuthController } from "../controllers";
// import { User } from "../../@types/account";

export type User = {
  id: String;
  email: String;
  isAdmin: Boolean;
  profile: {
    fullName: String;
  };
};

export type Auth = {
  isAuthenticated?: boolean;
  user?: User;
};

export type AuthCache = {
  viewer: Auth;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const AUTH_VIEWER_QUERY = gql`
  query Viewer {
    viewer {
      id
      email
      isAdmin
      profile {
        fullName
      }
    }
  }
`;

export const unAuthUser = {
  id: "AnonymousUser",
  email: "",
  isAdmin: false,
  profile: {
    fullName: "Default",
  },
};

const initialAuthState: AuthCache = {
  viewer: {
    isAuthenticated: false,
    user: unAuthUser,
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

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      payload
      token
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($email: String!, $password: String!, $fullName: String) {
    createUser(email: $email, password: $password, fullName: $fullName) {
      user {
        email
        profile {
          fullName
        }
      }
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation Logout {
    deleteTokenCookie {
      deleted
    }
  }
`;

export const authController = (
  client: ApolloClient<any>,
  mutation?: DocumentNode,
  data?: Auth
): AuthController => {
  const login = async ({ email, password }: LoginParams) => {
    const response = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email: email, password: password },
    });

    console.log(response);
    if (response.data) {
      localStorage.setItem("token", response.data.tokenAuth.token);
    }
  };

  const register = async ({
    email,
    password,
    firstName,
    lastName,
  }: RegisterParams) => {
    const fullName = `${firstName} ${lastName}`;
    return client.mutate({
      mutation: CREATE_USER_MUTATION,
      variables: {
        email: email,
        password: password,
        fullName: fullName,
      },
    });
  };

  const logout = async () => {
    deleteAuthToken();
    return client.mutate({ mutation: LOGOUT_MUTATION });
  };

  const resetPassword = (data: any) => {};
  const updateProfile = (data: any) => {};

  return {
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
  };
};
