import { ApolloClient } from "@apollo/client";
import { LOADING_QUERY } from "./queries";
import { LoadingCache, LoadingController } from "./types";

const initialLoadingState: LoadingCache = {
  loading: {
    __typename: "Loading",
    state: false,
    error: {
      message: "",
    },
    success: {
      message: "",
    },
  },
};

export const initLoading = (client: ApolloClient<any>): void => {
  console.log("inside initialize loading");
  try {
    //   Read query from client
    const res = client.readQuery({
      query: LOADING_QUERY,
    });

    // Query dies exist raise error
    if (!res) throw new Error("There is no loading cache data in localStorage");
  } catch (error) {
    //   Write query to local storage
    client.writeQuery<LoadingCache>({
      query: LOADING_QUERY,
      data: initialLoadingState,
    });
  }
};

export const loadingController = (
  client: ApolloClient<any>
): LoadingController => {
  const _getLoadingState = () => {
    return client.readQuery({ query: LOADING_QUERY });
  };
  const setError = (message) => {
    const loadingState = _getLoadingState();
    // client.writeQuery({
    //   query: LOADING_QUERY,
    //   data: { ...loadingState, error: { message } },
    // });
  };

  const clearError = () => {
    const loadingState = _getLoadingState();
    // client.writeQuery({
    //   query: LOADING_QUERY,
    //   data: { ...loadingState, error: { message: "" } },
    // });
  };

  const setSuccess = (message) => {
    const loadingState = _getLoadingState();
    // client.writeQuery({
    //   query: LOADING_QUERY,
    //   data: { ...loadingState, success: { message } },
    // });
  };

  const clearSuccess = () => {
    const loadingState = _getLoadingState();
    // client.writeQuery({
    //   query: LOADING_QUERY,
    //   data: { ...loadingState, success: { message: "" } },
    // });
  };

  const setLoading = () => {
    const loadingState = _getLoadingState();
    // client.writeQuery({
    //   query: LOADING_QUERY,
    //   data: { ...loadingState, loading: true },
    // });
  };

  return {
    setLoading,
    setSuccess,
    clearSuccess,
    setError,
    clearError,
  };
};
