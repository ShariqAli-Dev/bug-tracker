import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaBug, FaLock, FaUserAlt } from "react-icons/fa";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const helperTexts = [
  { text: "Have an account?", hyperText: "Sign In", url: "/" },
  { text: "Sign in as a", hyperText: "Demo User", url: "demo" },
];
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Register: NextPage = () => {
  const [, register] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <Head>
        <title>Bug Tracker - Register</title>
        <meta
          name="User Register"
          content="Page where user can register an account"
        />
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
          p={{ base: "1rem", sm: "2rem", md: "3rem" }}
          rounded="xl"
          width={{ base: "85%", md: "65%", lg: "45%", xl: "35%" }}
        >
          {/* HEADING */}
          <Flex color="primary" justifyContent="center" alignItems="center">
            <FaBug style={{ margin: "1rem" }} size={45} />
            <Heading>Bug Tracker Registration</Heading>
          </Flex>

          {/* FORM  */}
          <Box minW={{ base: "90%", md: "458px" }}>
            <Formik
              initialValues={{ email: "", password: "", name: "" }}
              onSubmit={async (values) => {
                const { data } = await register({ options: values });
                if (data?.register.errors) {
                  // send a toast alert
                  if (!toast.isActive("register-error")) {
                    toast({
                      id: "register-error",
                      title: data.register.errors[0].field,
                      description: data.register.errors[0].message,
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
                } else if (data?.register.user) {
                  // worked

                  router.push("/dashboard");
                }
              }}
            >
              {({ values, handleChange, isSubmitting }) => (
                <Form>
                  <Stack spacing={4} p="1rem">
                    {/* NAME */}
                    <FormControl>
                      <InputGroup color="#7A7A7A">
                        <InputLeftElement pointerEvents="none">
                          <CFaUserAlt />
                        </InputLeftElement>
                        <Input
                          type="name"
                          placeholder="Name"
                          id="name"
                          name="name"
                          onChange={handleChange}
                          value={values.name}
                          autoComplete="name"
                          required
                        />
                      </InputGroup>
                    </FormControl>
                    {/* EMAIL */}
                    <FormControl>
                      <InputGroup color="#7A7A7A">
                        <InputLeftElement pointerEvents="none">
                          <CFaUserAlt />
                        </InputLeftElement>
                        <Input
                          type="email"
                          placeholder="Email Address"
                          id="email"
                          name="email"
                          onChange={handleChange}
                          value={values.email}
                          autoComplete="email"
                          required
                        />
                      </InputGroup>
                    </FormControl>
                    {/* PASSWORD */}
                    <FormControl color="#7A7A7A">
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <CFaLock />
                        </InputLeftElement>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          id="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          autoComplete="current-password"
                          required
                        />
                        <InputRightElement>
                          <Button
                            width="4.5rem"
                            size="sm"
                            onClick={handleShowPassword}
                          >
                            {showPassword ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      {/* SUBMIT LOGIN */}
                      <Button
                        borderRadius={0}
                        type="submit"
                        backgroundColor="primary"
                        width="full"
                        marginTop={5}
                        marginBottom={5}
                        rounded="xl"
                        color="tertiary"
                        _hover={{
                          backgroundColor: "tertiary",
                          color: "primary",
                          border: "2px",
                          borderColor: "primary",
                        }}
                        isLoading={isSubmitting}
                      >
                        Sign Up
                      </Button>
                      {/* BOTTOM  LINKS */}
                      <FormHelperText textAlign="center">
                        {helperTexts.map((helperText) => {
                          return (
                            <Flex
                              justifyContent="center"
                              alignItems="center"
                              key={helperText.url}
                              padding=".5rem"
                              color="primary"
                            >
                              <Text marginRight={1} fontSize="md">
                                {helperText.text}
                              </Text>
                              <Text as="u" fontSize="md">
                                <Link href={helperText.url}>
                                  {helperText.hyperText}
                                </Link>
                              </Text>
                            </Flex>
                          );
                        })}
                      </FormHelperText>
                    </FormControl>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
