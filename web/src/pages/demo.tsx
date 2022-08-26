import {
  Box,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaBug } from "react-icons/fa";
import { getAccessToken } from "../accessTokens";
import useUserStore from "../store/user";

const avatars = [
  {
    role: "DEMO_ADMIN",
    url: "https://cdn-icons-png.flaticon.com/512/236/236831.png",
  },
  {
    role: "DEMO_PROJECT_MANAGER",
    url: "https://cdn-icons-png.flaticon.com/512/236/236831.png",
  },
  {
    role: "DEMO_DEVELOPER",
    url: "https://cdn-icons-png.flaticon.com/512/146/146031.png",
  },
  {
    role: "DEMO_SUBMITTER",
    url: "https://cdn-icons-png.flaticon.com/512/147/147142.png",
  },
];

const Demo: NextPage = () => {
  const demoLogin = useUserStore((state) => state.demoLogin);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="primary"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
        backgroundColor="white"
        boxShadow="md"
        p={{ base: "1rem" }}
        rounded="xl"
        width={{ base: "85%", md: "75%", lg: "65%", xl: "45%" }}
        color="primary"
      >
        {/* Heading */}
        <Flex justifyContent="center" alignItems="center">
          <FaBug style={{ margin: "1rem" }} size={45} />
          <Heading>Demo-User Login</Heading>
        </Flex>
        {/* Users */}
        <SimpleGrid
          columns={2}
          spacingX={{ base: "10px", sm: "30px", md: "50px", lg: "80px" }}
          spacingY={{ base: "40px", sm: "60px", md: "80px" }}
        >
          {avatars.map(({ role, url }) => {
            return (
              <Box key={role} onClick={() => demoLogin(role)}>
                <Link href="dashboard">
                  <Box cursor="pointer">
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                    >
                      <Image w="35%" alt="user icon" src={url} />
                      <Text textAlign="center" fontSize="xl">
                        {role}
                      </Text>
                    </Flex>
                  </Box>
                </Link>
              </Box>
            );
          })}
        </SimpleGrid>
        {/* Hyperlink */}
        <Flex justifyContent="center" alignItems="center" padding=".5rem">
          <Text color="primary" marginRight={1} fontSize="lg">
            Take me back to
          </Text>
          <Text color="primary" as="u" fontSize="lg">
            <Link href="/">Sign In</Link>
          </Text>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Demo;
