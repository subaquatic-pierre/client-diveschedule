import { ApolloClient, DocumentNode, FetchPolicy } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";
import { messageController } from "./messages";

import NProgress from "nprogress";

export interface SetState<TData>
  extends Dispatch<SetStateAction<TData | undefined>> {}

export interface NetworkRequestParams {
  query?: DocumentNode;
  mutation?: DocumentNode;
  fetchPolicy?: FetchPolicy;
  variables?: any;
}

export function updateClient(
  client: ApolloClient<any>,
  query: DocumentNode,
  data: any
): void {
  client.writeQuery({
    query,
    data,
  });
}

export class BaseController {
  protected client: ApolloClient<any>;
  protected history: any;
  protected setError: (any?: any) => any;
  protected setSuccess: (any?: any) => any;

  constructor(client, history = null) {
    this.client = client;
    this.history = history;
    const { setError, setSuccess } = messageController(client);
    this.setError = setError;
    this.setSuccess = setSuccess;
  }

  async _performApolloRequest({
    query,
    mutation,
    variables,
    fetchPolicy,
  }: NetworkRequestParams) {
    NProgress.start();
    let res = null;
    try {
      if (query) {
        res = await this.client.query({
          query,
          variables,
          fetchPolicy,
        });
      } else if (mutation) {
        res = await this.client.mutate({
          mutation,
          variables,
        });
      }
      NProgress.done();
      return res;
    } catch (error) {
      NProgress.done();
      return { error: error };
    }
  }

  public static getControls(client: ApolloClient<any>, history?: any) {}
}
