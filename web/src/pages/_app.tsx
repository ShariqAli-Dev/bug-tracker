import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider, createClient } from "urql";
import theme from "../theme";
import { getAccessToken, setAccessToken } from "../accessTokens";
import { useEffect, useState } from "react";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: () => {
    const token = getAccessToken();
    return {
      credentials: "include", // sends a cookie
      headers: {
        authorization: token ? `bearer ${token}` : "",
      },
    };
  },
});

function BugTracker({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/refresh-token", {
      method: "POST",
      credentials: "include",
    }).then(async (data) => {
      const { accessToken } = await data.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default BugTracker;
