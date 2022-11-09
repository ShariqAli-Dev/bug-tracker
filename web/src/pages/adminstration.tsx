import { Box, Container, Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import BurgerMenu from "../components/BurgerMenu";
import NavBar from "../components/Navbar";
import { useUsersQuery, Users } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Adminstration: NextPage = () => {
  const [{ data: users, fetching }] = useUsersQuery();
  const [selectedUser, setSelectedUser] = useState<Users | undefined>(
    undefined
  );

  if (fetching) {
    return <></>;
  }

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
          //   backgroundColor="red"
          marginTop="4rem"
          height="40%"
        >
          <Box height="full" width={{ base: "85%", md: "45%" }}>
            <Text>Organization</Text>{" "}
            <Box
              overflowY="auto"
              scrollBehavior="auto"
              height="full"
              width="full"
              borderColor="light-blue"
              borderWidth={0.1}
              borderRadius={"xl"}
              paddingTop="1rem"
            >
              {users?.users.map((u) => (
                <Flex
                  width="full"
                  justifyContent={"space-between"}
                  fontSize={"1rem"}
                  key={u.email}
                  cursor="pointer"
                >
                  <Box
                    display="flex"
                    justifyContent="space-around"
                    width="full"
                  >
                    <Text>{u.name}</Text>
                    <Text>{u.email}</Text>
                  </Box>
                </Flex>
              ))}
            </Box>
          </Box>
          <Box height="full" width={{ base: "85%", md: "45%" }}>
            <Text>Edit User Information</Text>
            <Box
              overflowY="auto"
              scrollBehavior="auto"
              height="full"
              width="full"
              borderColor="light-blue"
              borderWidth={0.1}
              borderRadius={"xl"}
              paddingTop="1rem"
            >
              testng
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default withUrqlClient(createUrqlClient)(Adminstration);
