import { ApolloClient } from "@apollo/client";
import { ErrorController } from "../../@types/controllers";
import { ERROR_QUERY } from "./queries";

export const errorController = (client: ApolloClient<any>): ErrorController => {
  const setError = (message) => {
    client.writeQuery({ query: ERROR_QUERY, data: { error: { message } } });
  };

  const clearError = () => {
    client.writeQuery({ query: ERROR_QUERY, data: { error: { message: "" } } });
  };

  return {
    setError,
    clearError,
  };
};
