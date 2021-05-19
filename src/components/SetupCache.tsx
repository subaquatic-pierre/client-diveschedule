import React, { ReactNode } from "react";
import { useApolloClient } from "@apollo/client";
import { initAuth } from "../cache/controllers/auth";
import { initSettings } from "../cache/controllers/settings";

type SetupCacheProps = {
  children?: ReactNode;
};

export default function SetupCache({ children }: SetupCacheProps) {
  const client = useApolloClient();

  initSettings(client);
  initAuth(client);

  return <>{children}</>;
}
