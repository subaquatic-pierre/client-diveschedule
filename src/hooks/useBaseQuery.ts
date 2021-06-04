import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { Color } from "@material-ui/lab/Alert";
import { messageController } from "../controllers/messages";

interface IBaseQueryOptions {
  severity?: Color | undefined;
  errorMessage?: string;
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

  if (options.severity === undefined) {
    options.severity = "error";
  }

  if (options.onCompleted === undefined) {
    options.onCompleted = (data: any) => {
      //   window.location.reload();
    };
  }

  if (options.onError === undefined) {
    options.onError = (error: any) => {
      if (options.errorMessage) setError(options.errorMessage);
      console.log(error);
    };
  }

  const { data, error, loading } = useQuery<TData>(gqlString, options);
  return { data, error, loading };
};
