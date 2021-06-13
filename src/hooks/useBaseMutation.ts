import { useMutation, useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import { messageController } from "../controllers/messages";
import NProgress from "nprogress";

interface IMutationOptions {
  errorMessage?: string;
  successMessage?: string;
  onCompleted?: (data: any) => void | undefined;
  onError?: (error: any) => void | undefined;
  update?: (cache: any, data: any) => void | undefined;
}

const useBaseMutation = <TData>(
  gqlString: any,
  options: IMutationOptions = {}
): any => {
  const client = useApolloClient();
  const { setError, setSuccess } = messageController(client);

  // Set default options if any are not present on config object
  if (options.onCompleted === undefined) {
    options.onCompleted = (data: any) => {
      if (options.successMessage) setSuccess(options.successMessage);
    };
  }

  if (options.onError === undefined) {
    options.onError = (error: any) => {
      console.log(error);
      setError(error.message);
      if (options.errorMessage)
        setError(`${options.errorMessage}: ${error.message}`);
    };
  }

  const [mutation, { data, error, loading }] = useMutation<TData>(
    gqlString,
    options
  );

  useEffect(() => {
    if (loading && !data) NProgress.start();
    if (!loading && data) NProgress.done();
    if (!loading && error) NProgress.done();
  }, [loading, data, error]);

  return { mutation, data, error, loading };
};

export default useBaseMutation;
