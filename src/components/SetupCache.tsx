import React, { ReactNode } from "react";
import { ApolloClient, useApolloClient } from "@apollo/client";
import {
  SETTINGS_CACHE_QUERY,
  SettingsCache,
  initializeSettings,
} from "../cache/settings";

type SetupCacheProps = {
  children?: ReactNode;
};

export default function SetupCache({ children }: SetupCacheProps) {
  const client = useApolloClient();

  initializeSettings(client);
  return <>{children}</>;
}
