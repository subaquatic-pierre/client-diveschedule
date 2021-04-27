import { createContext } from "react";

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const deleteAuthToken = () => {
  localStorage.removeItem("token");
};

export const needRefreshToken = (expDate: Date): boolean => {
  const now = new Date().getTime();
  const halfTime = expDate.getTime() / 2;
  const expTime = now + halfTime;
  if (now > expTime) {
    return true;
  } else {
    return false;
  }
};

interface IAuthContext {
  isAuth: boolean;
  isStaff: boolean;
  email: string;
}

export const getAuthContextData = (authContext: any): IAuthContext => {
  if (authContext) {
    if (authContext.user.__typename === "AnonUserType") {
      return {
        isAuth: false,
        isStaff: false,
        email: "",
      };
    } else {
      return {
        isAuth: true,
        ...authContext.user,
      };
    }
  } else {
    return {
      isAuth: false,
      isStaff: false,
      email: "",
    };
  }
};

export const AuthContext = createContext({} as IAuthContext);
