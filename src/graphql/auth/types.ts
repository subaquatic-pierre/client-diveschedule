import { User } from "../../@types/user";

export type RegisterParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type Auth = {
  __typename?: "UserType";
  isAuthenticated?: boolean;
  user?: User;
};

export type AuthCache = {
  viewer: Auth;
};

export type AuthController = {
  login: ({ email, password }: LoginParams, history: any) => void;
  register: ({ email, password, firstName, lastName }: RegisterParams) => void;
  logout: (history: any) => void;
  resetPassword: (data: any) => void;
};

export type LoginParams = {
  email: string;
  password: string;
};
