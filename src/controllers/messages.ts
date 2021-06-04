import { ApolloClient } from "@apollo/client";
import { MESSAGE_CACHE_QUERY } from "../graphql/messages";
import { MessagesCache, Messages } from "../graphql/messages";
import { MessagesController } from "../@types/controllers";
import { updateClient } from "./index";

const initialMessagesState: MessagesCache = {
  messages: {
    __typename: "Messages",
    error: {
      message: "",
    },
    success: {
      message: "",
    },
  },
};

export const initMessages = (client: ApolloClient<any>): void => {
  try {
    //   Read query from client
    const res = client.readQuery({
      query: MESSAGE_CACHE_QUERY,
    });

    // Query dies exist raise error
    if (!res) throw new Error("There is no loading cache data in localStorage");
  } catch (error) {
    //   Write query to local storage
    client.writeQuery<MessagesCache>({
      query: MESSAGE_CACHE_QUERY,
      data: initialMessagesState,
    });
  }
};

export const messageController = (
  client: ApolloClient<any>
): MessagesController => {
  const _getMessagesState = (): MessagesCache => {
    const data = client.readQuery({ query: MESSAGE_CACHE_QUERY });
    return data.messages;
  };

  const _updateLoading = (updatedData: Messages) => {
    const currentState = _getMessagesState();
    const newLoadingState: MessagesCache = {
      messages: {
        ...currentState,
        ...updatedData,
      },
    };
    updateClient(client, MESSAGE_CACHE_QUERY, newLoadingState);
  };

  const setError = (message) => {
    const newData = {
      error: { message },
    };
    _updateLoading(newData);
  };

  const clearError = () => {
    const newData = {
      error: null,
    };
    _updateLoading(newData);
  };

  const setSuccess = (message) => {
    const newData = {
      success: { message },
    };
    _updateLoading(newData);
  };

  const clearSuccess = () => {
    const newData = {
      success: null,
    };
    _updateLoading(newData);
  };

  return {
    setSuccess,
    clearSuccess,
    setError,
    clearError,
  };
};
