import { ReactNode } from "react";
import { Redirect } from "react-router-dom";
// hooks
import useAuth from "../hooks/useAuth";
// routes
import { PATH_DASHBOARD } from "../routes/paths";
// components
import LoadingScreen from "../components/LoadingScreen";

// ----------------------------------------------------------------------

type GuestProtectProps = {
  children: ReactNode;
};

export default function GuestProtect({ children }: GuestProtectProps) {
  const { user, loading, isAuthenticated } = useAuth();
  console.log(user);

  if (loading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Redirect to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}
