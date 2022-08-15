import type { NextPage } from "next";
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
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaUserAlt, FaLock, FaBug } from "react-icons/fa";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";

const helperTexts = [
  { text: "Forgot your", hyperText: "Password?", url: "forgot-password" },
  { text: "Create an account?", hyperText: "Sign Up", url: "signup" },
  { text: "Sign in as a", hyperText: "Demo User", url: "demo" },
];
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Home: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleShowPassword = () => setShowPassword(!showPassword);

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
        p={{ base: "1rem", sm: "2rem", md: "3rem" }}
        rounded="xl"
        width={{ base: "85%", md: "65%", lg: "45%", xl: "35%" }}
      >
        {/* HEADING */}
        <Flex color="primary" justifyContent="center" alignItems="center">
          <FaBug style={{ margin: "1rem" }} size={45} />
          <Heading>Bug Tracker Login</Heading>
        </Flex>

        {/* FORM  */}
        <Box minW={{ base: "90%", md: "458px" }}>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form>
                <Stack spacing={4} p="1rem">
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
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange}
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
                        autoComplete="current-password"
                        value={values.password}
                        onChange={handleChange}
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

                    {/* SUBMIT Sign In */}
                    <Button
                      borderRadius={0}
                      type="submit"
                      variant="solid"
                      width="full"
                      marginTop={5}
                      marginBottom={5}
                      rounded="xl"
                      color="tertiary"
                      backgroundColor="primary"
                      _hover={{
                        backgroundColor: "tertiary",
                        color: "primary",
                        border: "2px",
                        borderColor: "primary",
                      }}
                      isLoading={isSubmitting}
                    >
                      Sign In
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
  );
};

export default Home;
