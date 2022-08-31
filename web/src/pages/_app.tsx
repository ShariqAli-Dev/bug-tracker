import { ChakraProvider } from "@chakra-ui/react";
import jwt from "jsonwebtoken";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useUserStore from "../store/user";
import "../styles/globals.css";
import theme from "../theme";

function BugTracker({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const { accessToken, setAccessToken } = useUserStore((state) => ({
    accessToken: state.accessToken,
    setAccessToken: state.setAccessToken,
  }));

  const router = useRouter();

  useEffect(() => {
    // if accessToken doesn't exist, get it
    if (!accessToken) {
      alert("token does not exist");
      fetch("http://localhost:4000/refresh-token", {
        method: "POST",
        credentials: "include",
      }).then(async (data) => {
        const { accessToken } = await data.json();
        setAccessToken(accessToken);
        setLoading(false);
      });
    } else {
      alert("token exists");
      try {
        const decoded: any = jwt.verify(
          accessToken,
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
      } catch {
        alert("token expired");
        setLoading(false);
        router.push("/");
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
