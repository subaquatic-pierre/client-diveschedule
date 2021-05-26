export type Loading = {
  __typename?: "Loading";
  state: boolean;
  error: {
    message: string;
  };
  success: {
    message: string;
  };
};

export type LoadingCache = {
  loading: Loading;
};

export type LoadingController = {
  setError: (message: string) => void;
  clearError: () => void;
  setSuccess: (message: string) => void;
  clearSuccess: () => void;
  setLoading: (state: boolean) => void;
};
