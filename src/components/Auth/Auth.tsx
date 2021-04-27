import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { AUTH_QUERY } from "./queries";
import { AuthContext, needRefreshToken, deleteAuthToken } from "./utils";
import { VERIFY_TOKEN, REFRESH_TOKEN, DELETE_AUTH_TOKEN } from "./mutations";

export interface IAuthProps {
  token: string | null;
}

export const Auth: React.FC<IAuthProps> = ({ children, token }) => {
  const authQuery = useQuery(AUTH_QUERY);
  const history = useHistory();
  const [getRefreshToken] = useMutation(REFRESH_TOKEN);
  const [logout] = useMutation(DELETE_AUTH_TOKEN);
  const [verifyToken] = useMutation(VERIFY_TOKEN, {
    onCompleted: (data) => {
      const tokenExpTime = new Date(data.verifyToken.payload.exp);
      if (needRefreshToken(tokenExpTime)) {
        getRefreshToken({ variables: { token } });
      }
    },
    onError: (error) => {
      console.log(error);
      deleteAuthToken();
      window.location.assign("/");
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
