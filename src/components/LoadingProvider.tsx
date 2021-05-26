import { ReactNode, useEffect } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import { initLoading } from "../controllers/loading";
import { loadingController, LOADING_QUERY } from "../controllers/loading";
import { useSnackbar } from "notistack";
import BaseLoading from "./BaseLoading";

type AuthLoadingProps = {
  children: ReactNode;
};

export default function LoadingProvider({ children }: AuthLoadingProps) {
  const client = useApolloClient();
  const { clearError, clearSuccess, clearLoading } = loadingController(client);

  const { enqueueSnackbar } = useSnackbar();
  const { data, loading, error } = useQuery(LOADING_QUERY);

  useEffect(() => {
    initLoading(client);
  }, [client]);

  if (error) {
    enqueueSnackbar(error.message, { variant: "error" });
  }

  if (loading) {
    return <BaseLoading />;
  }

  //   useEffect(() => {
  //     if (data) {
  //       console.log(data);
  //     }
  //   }, [data]);

  //   useEffect(() => {
  //     clearError();
  //     clearLoading();
  //     clearSuccess();
  //   }, [clearError, clearSuccess, clearLoading]);

  return <>{children}</>;
}
