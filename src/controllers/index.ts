import { ApolloClient, DocumentNode } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";

export interface SetState<TData>
  extends Dispatch<SetStateAction<TData | undefined>> {}

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
