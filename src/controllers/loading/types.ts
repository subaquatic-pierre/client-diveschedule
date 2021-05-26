export type Loading = {
  __typename?: "Loading";
  state?: boolean;
  error?: {
    message: string;
  } | null;
  success?: {
    message: string;
  } | null;
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
