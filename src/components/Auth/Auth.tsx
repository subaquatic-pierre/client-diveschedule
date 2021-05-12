import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { AUTH_QUERY } from "./queries";
import { needRefreshToken, deleteAuthToken } from "./utils";
import { VERIFY_TOKEN, REFRESH_TOKEN, DELETE_AUTH_TOKEN } from "./mutations";
import { useBaseMutation } from "../../hooks";
import { AlertContext } from "../../App";

export interface IAuthProps {
  token: string | null;
}

export interface IAuthContext {
  isAuth: boolean;
  viewer: {
    email: string | null;
    isAdmin: boolean | null;
  };
}

export const initialAuthContext: IAuthContext = {
  isAuth: false,
  viewer: {
    email: null,
    isAdmin: null,
  },
};

export const AuthContext = React.createContext(
  initialAuthContext as IAuthContext
);

export const Auth: React.FC<IAuthProps> = ({ children, token }) => {
  const { setAlert } = React.useContext(AlertContext);
  const authQuery = useQuery(AUTH_QUERY);
  const history = useHistory();

  const { mutation: getRefreshToken } = useBaseMutation(REFRESH_TOKEN);
  const { mutation: logout } = useBaseMutation(DELETE_AUTH_TOKEN);

  // Check token is valid and refresh if needed
  const { mutation: verifyToken } = useBaseMutation(VERIFY_TOKEN, {
    onCompleted: (data: any) => {
      const tokenExpTime = new Date(data.verifyToken.payload.exp);
      if (needRefreshToken(tokenExpTime)) {
        getRefreshToken({ variables: { token } });
      }
    },
    onError: (error: any) => {
      deleteAuthToken();
      window.location.assign("/");
      setAlert({
        state: true,
        severity: "error",
        message: error.message,
      });
    },
  });

  const authData = authQuery.data;

  React.useEffect(() => {
    if (token !== null) {
      verifyToken({
        variables: { token },
      });
    } else {
      deleteAuthToken();
      logout();
      history.push("/");
    }
  }, [verifyToken, logout, history, token]);

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};
