import { useCallback, useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { CachePersistor, LocalStorageWrapper } from "apollo3-cache-persist";
import { getAuthToken } from "../utils/auth";
import { getApiUri } from "../utils";

// Authorization logic
const token = getAuthToken();

export default function useApolloSetup() {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const [persistor, setPersistor] = useState<
    CachePersistor<NormalizedCacheObject>
  >();

  useEffect(() => {
    async function init() {
      const cache = new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              bookings: {
                merge(existing, incoming) {
                  return incoming;
                },
              },
              bookingSet: {
                merge(existing, incoming) {
                  return incoming;
                },
              },
            },
          },
        },
      });

      let newPersistor = new CachePersistor({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
        // debug: true,
        trigger: "write",
      });

      await newPersistor.restore();

      setPersistor(newPersistor);

      const httpLink = new HttpLink({
        uri: getApiUri(),
        headers: {
          Authorization: token ? `JWT ${token}` : "",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      });

      setClient(
        new ApolloClient({
          link: httpLink,
          cache,
        })
      );
    }

    init().catch(console.error);
  }, []);

  const clearCache = useCallback(() => {
    if (!persistor) {
      return;
    }
    persistor.purge();
  }, [persistor]);

  const reload = useCallback(() => {
    window.location.reload();
  }, []);

  if (client) return client;
}
