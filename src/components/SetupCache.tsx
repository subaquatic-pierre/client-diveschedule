import React, { ReactNode } from "react";
import { useApolloClient } from "@apollo/client";
import { initAuth } from "../controllers/auth/auth";
import { initSettings } from "../controllers/settings";

type SetupCacheProps = {
  children?: ReactNode;
};

export default function SetupCache({ children }: SetupCacheProps) {
  const client = useApolloClient();

  initSettings(client);
  initAuth(client);

  return <>{children}</>;
}
