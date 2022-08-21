import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider, createClient } from "urql";
import theme from "../theme";
import { getAccessToken } from "../accessTokens";

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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
