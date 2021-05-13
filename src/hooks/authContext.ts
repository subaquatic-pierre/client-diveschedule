import React from "react";
import {
  AuthContext,
  IAuthContext,
  initialAuthContext
} from "../components/Auth/Auth";

export const useAuthContext = (): IAuthContext => {
  const value = React.useContext(AuthContext);
  try {
    const {
      viewer: { email, isAdmin }
    } = value;
    return { isAuth: true, viewer: { email, isAdmin } };
  } catch (error) {
    return initialAuthContext;
  }
};
