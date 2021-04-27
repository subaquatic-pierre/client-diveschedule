import Cookies from "js-cookie";
import { getAuthToken } from "./components/Auth/utils";
import { ApolloLink } from "@apollo/client";

// Authorization logic
const token = getAuthToken();

// export const authMiddleware = new ApolloLink((operation, forward) => {
//   operation.setContext(({ headers = {} }) => ({
//     headers: {
//       ...headers,
//       Authorization: `JWT ${token}` || "",
//     },
//   }));

//   return forward(operation);
// });

// export const csrfMiddleware = new ApolloLink((operation, forward) => {
//   operation.setContext(({ headers = {} }) => ({
//     headers: {
//       ...headers,
//       // Authorization: `JWT ${token}` || "",
//       "X-CSRFToken": Cookies.get("csrftoken"),
//     },
//   }));

//   return forward(operation);
// });
