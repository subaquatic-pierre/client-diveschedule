import { useApolloClient } from "@apollo/client";
import { initAuth } from "../graphql/auth/auth";
import { initSettings } from "../graphql/settings";
import { initMessages } from "../controllers/messages";

export default function SetupCache() {
  const client = useApolloClient();

  initSettings(client);
  initAuth(client);
  initMessages(client);
  return <></>;
}
