import { GetServerSideProps } from "next";
import { getAccessToken } from "../accessTokens";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: { token: getAccessToken() },
  };
};
