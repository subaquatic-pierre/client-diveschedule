import { ApolloClient } from "@apollo/client";
import { LoadingController } from "../../@types/controllers";
import { LOADING_QUERY } from "./queries";

type LoadingState = {
  state: boolean;
  error: {
    message: string;
  };
  success: {
    message: string;
  };
};

type LoadingCache = {
  loading: LoadingState;
};

const initialLoadingState: LoadingCache = {
  loading: {
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
    client.writeQuery({
      query: LOADING_QUERY,
      data: { ...loadingState, error: { message } },
    });
  };

  const clearError = () => {
    const loadingState = _getLoadingState();
    client.writeQuery({
      query: LOADING_QUERY,
      data: { ...loadingState, error: { message: "" } },
    });
  };

  const setSuccess = (message) => {
    const loadingState = _getLoadingState();
    client.writeQuery({
      query: LOADING_QUERY,
      data: { ...loadingState, success: { message } },
    });
  };

  const clearSuccess = () => {
    const loadingState = _getLoadingState();
    client.writeQuery({
      query: LOADING_QUERY,
      data: { ...loadingState, success: { message: "" } },
    });
  };

  const setLoading = () => {
    const loadingState = _getLoadingState();
    client.writeQuery({
      query: LOADING_QUERY,
      data: { ...loadingState, loading: true },
    });
  };

  const clearLoading = () => {
    const loadingState = _getLoadingState();
    client.writeQuery({
      query: LOADING_QUERY,
      data: { ...loadingState, loading: false },
    });
  };

  return {
    setLoading,
    clearLoading,
    setSuccess,
    clearSuccess,
    setError,
    clearError,
  };
};
