import { ApolloClient, DocumentNode } from "@apollo/client";

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
