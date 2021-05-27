import { useApolloClient } from "@apollo/client";
import { initAuth } from "../controllers/auth/auth";
import { initSettings } from "../controllers/settings";
import { initMessages } from "../controllers/messages";

export default function SetupCache() {
  const client = useApolloClient();

  initSettings(client);
  initAuth(client);
  initMessages(client);
  return <></>;
}
