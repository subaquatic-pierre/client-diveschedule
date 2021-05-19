import React, { ReactNode } from "react";
import { useApolloClient } from "@apollo/client";
import { initAuth } from "../cache/auth";
import { initSettings } from "../cache/settings";

type SetupCacheProps = {
  children?: ReactNode;
};

export default function SetupCache({ children }: SetupCacheProps) {
  const client = useApolloClient();

  initSettings(client);
  initAuth(client);

  return <>{children}</>;
}
