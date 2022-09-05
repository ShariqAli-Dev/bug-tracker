import { cacheExchange, dedupExchange, fetchExchange } from "urql";
import useUserStore from "../store/user";

export const createUrqlClient = (ssrExchange: any) => {
  const accessToken = useUserStore((state) => state.accessToken);
  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: () => {
      const token = accessToken;
      return {
        credentials: "include", // sends a cookie
        headers: {
          authorization: token ? `bearer ${token}` : "",
        },
      } as const;
    },
    exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
  };
};
