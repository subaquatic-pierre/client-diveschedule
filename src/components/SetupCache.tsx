import React, { ReactNode } from "react";
import { useApolloClient } from "@apollo/client";
import { SETTINGS_QUERY } from "../hooks/useSettingsApollo";

type SetupCacheProps = {
  children?: ReactNode;
};

export default function SetupCache({ children }: SetupCacheProps) {
  const client = useApolloClient();

  try {
    const data = client.readQuery({
      query: SETTINGS_QUERY,
    });
    if (!data) throw new Error("There is no data in localStorage");
  } catch (error) {
    client.writeQuery({
      query: SETTINGS_QUERY,
      data: {
        settings: {
          __typename: "Settings",
          themeMode: "light",
          themeDirection: "ltr",
        },
      },
    });
  }

  return <>{children}</>;
}
