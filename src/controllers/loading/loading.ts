import { ApolloClient } from "@apollo/client";
import { LOADING_CACHE_QUERY } from "./queries";
import { LoadingCache, LoadingController, Loading } from "./types";
import { updateClient } from "../index";

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
  try {
    //   Read query from client
    const res = client.readQuery({
      query: LOADING_CACHE_QUERY,
    });

    // Query dies exist raise error
    if (!res) throw new Error("There is no loading cache data in localStorage");
  } catch (error) {
    //   Write query to local storage
    client.writeQuery<LoadingCache>({
      query: LOADING_CACHE_QUERY,
      data: initialLoadingState,
    });
  }
};

export const loadingController = (
  client: ApolloClient<any>
): LoadingController => {
  const _getLoadingState = () => {
    const data = client.readQuery({ query: LOADING_CACHE_QUERY });
    return data.loading;
  };

  const _updateLoading = (updatedData: Loading) => {
    const currentState = _getLoadingState();
    const newLoadingState: LoadingCache = {
      loading: {
        ...currentState,
        ...updatedData,
      },
    };
    console.log(newLoadingState);
    updateClient(client, LOADING_CACHE_QUERY, newLoadingState);
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

  const setLoading = (state) => {
    const newData = {
      state: state,
    };
    _updateLoading(newData);
  };

  return {
    setLoading,
    setSuccess,
    clearSuccess,
    setError,
    clearError,
  };
};
