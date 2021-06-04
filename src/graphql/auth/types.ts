import { User } from "../../@types/user";

export type Auth = {
  __typename?: "UserType";
  isAuthenticated?: boolean;
  user?: User;
};

export type AuthCache = {
  viewer: Auth;
};
