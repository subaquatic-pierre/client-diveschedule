import { useEffect } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import {
  messagesController,
  MESSAGE_CACHE_QUERY,
  MessagesCache,
} from "../controllers/messages";
import { useSnackbar } from "notistack";

export default function Messages() {
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();
  const { clearError, clearSuccess } = messagesController(client);
  const { data, error } = useQuery<MessagesCache>(MESSAGE_CACHE_QUERY, {
    fetchPolicy: "cache-only",
  });

  const { error: errorCache, success: successCache } = data.messages;

  if (error) enqueueSnackbar(error.message, { variant: "error" });

  useEffect(() => {
    if (errorCache && errorCache.message) {
      enqueueSnackbar(errorCache.message, { variant: "error" });
      clearError();
    }

    if (successCache && successCache.message) {
      enqueueSnackbar(successCache.message, { variant: "success" });
      clearSuccess();
    }
  });

  return <></>;
}
