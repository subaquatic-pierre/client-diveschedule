import { User } from "../../@types/user";

export type Auth = {
  __typename?: "UserType";
  isAuthenticated?: boolean;
  user?: User;
};

export type AuthCache = {
  viewer: Auth;
};

export type AuthController = {
  login: ({ email, password }: LoginParams) => void;
  register: ({ email, password, firstName, lastName }: RegisterParams) => void;
  logout: () => void;
  resetPassword: (data: any) => void;
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
