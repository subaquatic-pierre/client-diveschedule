import React, { ReactNode, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import { initAuth } from "../controllers/auth/auth";
import { initSettings } from "../controllers/settings";
import { initLoading } from "../controllers/loading/loading";

type SetupCacheProps = {
  children?: ReactNode;
};

export default function SetupCache({ children }: SetupCacheProps) {
  const client = useApolloClient();

  initSettings(client);
  initAuth(client);
  initLoading(client);

  return <>{children}</>;
}
