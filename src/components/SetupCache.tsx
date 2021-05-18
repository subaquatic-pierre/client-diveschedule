import React, { ReactNode } from "react";
import { useApolloClient, gql } from "@apollo/client";
import { SETTINGS_QUERY } from "../hooks/useSettingsApollo";

type SetupCacheProps = {
  children?: ReactNode;
};

// TEST DATA
export const TEST_QUERY = gql`
  query Test {
    test {
      value
    }
  }
`;

export default function SetupCache({ children }: SetupCacheProps) {
  const client = useApolloClient();

  try {
    const data = client.readQuery({
      query: SETTINGS_QUERY,
    });
    if (!data) throw new Error("There is no data in localStorage");

    // TEST DATA
    const test = client.readQuery({
      query: TEST_QUERY,
    });
    if (!test) throw new Error("There is no data in localStorage");
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

    // TEST DATA
    client.writeQuery({
      query: TEST_QUERY,
      data: {
        test: {
          value: 1,
        },
      },
    });
  }

  return <>{children}</>;
}
