import {
  Box,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaBug } from "react-icons/fa";
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const avatars = [
  {
    role: "Demo Admin",
    url: "https://cdn-icons-png.flaticon.com/512/236/236831.png",
    email: "demoAdmin@bugtracker.com",
  },
  {
    role: "Demo Project Manager",
    url: "https://cdn-icons-png.flaticon.com/512/149/149072.png",
    email: "demoProjectManager@bugtracker.com",
  },
  {
    role: "Demo Submitter",
    url: "https://cdn-icons-png.flaticon.com/512/147/147142.png",
    email: "demoSubmitter@bugtracker.com",
  },
  {
    role: "Demo Developer",
    url: "https://cdn-icons-png.flaticon.com/512/146/146031.png",
    email: "demoDeveloper@bugtracker.com",
  },
];

const Demo: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const [, login] = useLoginMutation();

  return (
    <>
      <Head>
        <title>Bug Tracker - Demo</title>
        <meta name="Demo User" content="Demo users login method" />
      </Head>
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
            {avatars.map(({ role, url, email }) => {
              return (
                <Box
                  key={role}
                  onClick={async () => {
                    const { data } = await login({
                      options: {
                        password: process.env
                          .NEXT_PUBLIC_DEMO_USER_PASSWORD as string,
                        email,
                      },
                    });
                    if (data?.login.errors) {
                      if (!toast.isActive("login-error")) {
                        toast({
                          id: "login-error",
                          title: data.login.errors[0].field,
                          description: data.login.errors[0].message,
                          status: "error",
                          duration: 3000,
                          isClosable: true,
                          variant: "subtle",
                          containerStyle: {
                            color: "primary",
                          },
                          position: "top",
                        });
                      }
                    } else if (data?.login.user) {
                      if (typeof router.query.next === "string") {
                        router.push(router.query.next);
                      } else {
                        // worked
                        router.push("/dashboard");
                      }
                    }
                  }}
                >
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
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Demo);
