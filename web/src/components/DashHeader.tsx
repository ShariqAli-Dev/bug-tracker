import { Box, Flex, Text } from "@chakra-ui/react";
import QueryForm from "./QueryForm";
import UserActions from "./UserActions";
import BurgerMenu from "./BurgerMenu";
import { useMeQuery } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const DashHeader = () => {
  const [{ data }] = useMeQuery();
  return (
    <Flex
      backgroundColor="white"
      w="full"
      h="7%"
      justifyContent="space-between"
      alignItems="center"
      boxShadow="xl"
    >
      {/* Logged in as Admin */}
      <Box display={{ base: "none", md: "inline" }}>
        <Flex
          color="primary"
          justifyContent="center"
          alignItems="center"
          padding=".5rem"
        >
          <Text marginRight={1} fontSize={{ base: "md", md: "lg" }}>
            Logged in as:{" "}
            <span
              style={{
                textDecoration: "underline",
              }}
            >
              {data?.me?.role.toUpperCase()}
            </span>
          </Text>
        </Flex>
      </Box>

      {/* searchbar, notis, user profile */}
      <Box w={{ base: "full", md: "65%", xl: "45%" }}>
        <Flex justifyContent="space-around" alignItems="center" padding="1rem">
          <BurgerMenu pageProps={{}} />
          <QueryForm />
          <UserActions />
        </Flex>
      </Box>
    </Flex>
  );
};

export default withUrqlClient(createUrqlClient)(DashHeader);
