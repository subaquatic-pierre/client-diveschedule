import { ReactNode } from "react";
import { Redirect } from "react-router-dom";
import { PATH_AUTH } from "../routes/paths";
import LoadingScreen from "../components/LoadingScreen";
import useAuth from "../hooks/useAuth";

// ----------------------------------------------------------------------

type AuthProtectProps = {
  children: ReactNode;
};

export default function AuthProtect({ children }: AuthProtectProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Redirect to={PATH_AUTH.login} />;
  }

  return <>{children}</>;
}
