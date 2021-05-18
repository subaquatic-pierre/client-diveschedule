import React, { ReactNode } from "react";
import { useApolloClient, gql } from "@apollo/client";
import { SETTINGS_QUERY } from "../hooks/useSettingsApollo";

type SetupCacheProps = {
  children?: ReactNode;
};

export default function SetupCache({ children }: SetupCacheProps) {
  const client = useApolloClient();
  try {
    const { settings } = client.readQuery({
      query: SETTINGS_QUERY,
    });
  } catch (error) {
    console.log(error);
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
