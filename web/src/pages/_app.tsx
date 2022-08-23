import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider, createClient } from "urql";
import theme from "../theme";
import { getAccessToken, setAccessToken } from "../accessTokens";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

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
    // if accessToken doesn't exist, get it
    if (!getAccessToken()) {
      fetch("http://localhost:4000/refresh-token", {
        method: "POST",
        credentials: "include",
      }).then(async (data) => {
        const { accessToken } = await data.json();
        setAccessToken(accessToken);
        setLoading(false);
      });
    } else {
      const decoded: any = jwt.verify(
        getAccessToken(),
        process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET as string
      );
      const date = parseInt(
        new Date()
          .getTime()
          .toString()
          .substring(0, decoded.exp.toString().length)
      );
      if (date - decoded.exp <= 120) {
        // result is in seconds
        fetch("http://localhost:4000/refresh-token", {
          method: "POST",
          credentials: "include",
        }).then(async (data) => {
          const { accessToken } = await data.json();
          setAccessToken(accessToken);
          setLoading(false);
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
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
