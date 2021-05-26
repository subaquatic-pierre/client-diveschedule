import { ReactNode } from "react";
import { useQuery } from "@apollo/client";
import { LOADING_QUERY } from "../controllers/loading";
import { LoadingCache } from "../controllers/loading";
import { useSnackbar } from "notistack";
import BaseLoading from "./BaseLoading";

type AuthLoadingProps = {
  children: ReactNode;
};

export default function LoadingProvider({ children }: AuthLoadingProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { loading, error } = useQuery<LoadingCache>(LOADING_QUERY, {
    fetchPolicy: "cache-only",
  });

  if (loading) return <BaseLoading />;

  if (error) {
    enqueueSnackbar(error.message, { variant: "error" });
  }

  return <>{children}</>;
}
