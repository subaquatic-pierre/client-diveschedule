import { ApolloClient, DocumentNode } from "@apollo/client";
import { Settings } from "./settings";
import { AuthCache } from "./auth";
import { UserCache } from "./user";

export type ApolloCache = {
  settings: Settings;
};

const initialCache: ApolloCache = {
  settings: {
    __typename: "Settings",
    themeDirection: "ltr",
    themeMode: "light",
  },
};

export function updateClient(
  client: ApolloClient<any>,
  query: DocumentNode,
  data: any
): void {
  client.writeQuery({
    query,
    data,
  });
}
