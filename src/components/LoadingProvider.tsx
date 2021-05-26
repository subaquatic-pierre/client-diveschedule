import { ReactNode, useEffect } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import { loadingController, LOADING_CACHE_QUERY } from "../controllers/loading";
import { LoadingCache } from "../controllers/loading";
import { useSnackbar } from "notistack";
import BaseLoading from "./BaseLoading";

type AuthLoadingProps = {
  children: ReactNode;
};

export default function LoadingProvider({ children }: AuthLoadingProps) {
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();
  const { clearError, clearSuccess } = loadingController(client);
  const { data, loading, error } = useQuery<LoadingCache>(LOADING_CACHE_QUERY, {
    fetchPolicy: "cache-only",
  });

  const { state: loadingCache } = data.loading;
  const { error: errorCache, success: successCache } = data.loading;

  if (error) enqueueSnackbar(error.message, { variant: "error" });

  useEffect(() => {
    if (errorCache) {
      enqueueSnackbar(errorCache.message, { variant: "error" });
      clearError();
    }

    if (successCache) {
      enqueueSnackbar(successCache.message, { variant: "success" });
      clearSuccess();
    }
  });

  if (loading) return <BaseLoading />;
  // if (loadingCache) return <BaseLoading />;

  return <>{children}</>;
}
