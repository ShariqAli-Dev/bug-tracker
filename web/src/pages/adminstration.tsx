import { Box, Container, Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import BurgerMenu from "../components/BurgerMenu";
import NavBar from "../components/Navbar";
import { createUrqlClient } from "../utils/createUrqlClient";

const Adminstration: NextPage = () => {
  return (
    <Flex
      h={{ base: "140vh", md: "100vh" }}
      flexDir="row"
      overflow="hidden"
      scrollBehavior="auto"
    >
      {/* Dashboard/Navbar */}
      <Flex
        w="15%"
        flexDir="column"
        alignItems="center"
        boxShadow="2px 0 5px -2px "
        display={{ base: "none", md: "flex" }}
      >
        <NavBar pageProps={{}} />
      </Flex>
      {/* Components */}
      <Flex w="full" flexDirection="column" overflowY="auto">
        <Flex w="full">
          <Box margin="auto">
            <BurgerMenu />
          </Box>
          <Text
            width={{ base: "95%", sm: "100%" }}
            align="center"
            fontSize="3xl"
          >
            Adminstration
          </Text>
        </Flex>
        {/* Contents */} {/* <DaGrid/> */}
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-around"
          backgroundColor="red"
          marginTop="4rem"
          height="40%"
        >
          <Box>
            <Text>Organization</Text>
          </Box>
          <Box>
            <Text>Edit User Information</Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default withUrqlClient(createUrqlClient)(Adminstration);
