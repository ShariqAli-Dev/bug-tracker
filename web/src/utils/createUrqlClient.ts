import { cacheExchange, dedupExchange, fetchExchange } from "urql";
import { getAccessToken } from "../accessTokens";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: () => {
    const token = getAccessToken();
    return {
      credentials: "include", // sends a cookie
      headers: {
        authorization: token ? `bearer ${token}` : "",
      },
    } as const;
  },
  exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
});
