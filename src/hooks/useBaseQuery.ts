import { useEffect } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import { messageController } from "../controllers/messages";
import NProgress from "nprogress";

interface IBaseQueryOptions {
  errorMessage?: string;
  defaultData?: any;
  onCompleted?: (data: any) => void | undefined;
  onError?: (error: any) => void | undefined;
}

export const useBaseQuery = <TData>(
  gqlString: any,
  options: IBaseQueryOptions = {}
): any => {
  const client = useApolloClient();
  const { setError } = messageController(client);

  // Set default options if any are not present on config object
  if (options.onCompleted === undefined) {
    options.onCompleted = (data: any) => {
      //   window.location.reload();
    };
  }

  if (options.onError === undefined) {
    options.onError = (error: any) => {
      if (options.errorMessage)
        setError(`${options.errorMessage}: ${error.message}`);
      console.log(error);
    };
  }

  const { data, error, loading } = useQuery<TData>(gqlString, options);

  useEffect(() => {
    NProgress.start();
  }, []);

  useEffect(() => {
    if (data && !loading) {
      NProgress.done();
    }
  }, [data, loading]);

  return { data, error, loading };
};
