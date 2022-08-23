import { ChakraProvider } from "@chakra-ui/react";
import jwt from "jsonwebtoken";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { getAccessToken, setAccessToken } from "../accessTokens";
import "../styles/globals.css";
import theme from "../theme";

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
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default BugTracker;
