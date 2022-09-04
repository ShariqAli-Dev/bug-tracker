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
  const { accessToken, setAccessToken, logout } = useUserStore((state) => ({
    accessToken: state.accessToken,
    setAccessToken: state.setAccessToken,
    logout: state.logout,
  }));

  const router = useRouter();

  /*
    if the pathname is / /register /demo or /forgot-password, return out of function
    else if token does not exist
      try and fetch acess toke
        success -> update access token
        error -> router user to login and logout()
    else, the token exists
      decode and check if token is within 2 mins of expiring
        if token is about to expire, refresh it
        if token isn't about to expire, load the page
    if this fails, route them to the login page and logout()
    */

  useEffect(() => {
    if (
      ["/", "/demo", "/register", "/forgot-password"].includes(router.pathname)
    ) {
      setLoading(false);
    }

    // if accessToken doesn't exist, get it
    else if (!accessToken) {
      fetch("http://localhost:4000/refresh-token", {
        method: "POST",
        credentials: "include",
      })
        .then(async (data) => {
          const { accessToken } = await data.json();
          setAccessToken(accessToken);
          setLoading(false);
        })
        .catch((err) => {
          router.push("/");
          logout();
        });
    } else {
      // alert("token exists");
      try {
        alert("decoding is in process");
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
        logout();
      }
    }
  }, [router.pathname]);

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
