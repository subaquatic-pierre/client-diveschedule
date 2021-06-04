import { ReactNode } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import { AuthCache } from "../../graphql/auth";
import { AUTH_VIEWER_QUERY } from "../../graphql/auth";
import { messageController } from "../../controllers/messages";

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const client = useApolloClient();
  const { setError } = messageController(client);
  const { error } = useQuery<AuthCache>(AUTH_VIEWER_QUERY);
  if (error) setError(error.message);

  return <>{children}</>;
}
