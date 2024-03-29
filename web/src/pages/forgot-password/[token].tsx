import {
  Flex,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  FormHelperText,
  Box,
  Text,
  chakra,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";

const CFaUserAlt = chakra(FaUserAlt);

const ChangePassword: NextPage = () => {
  const [, changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const [error, setError] = useState("");
  return (
    <>
      <Head>
        <title>Bug Tracker - Forgot Password</title>
        <meta
          name="Forgot Password Page"
          content="Page where user can reset password"
        />
      </Head>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="blackAlpha.700"
        justifyContent="center"
        alignItems="center"
        color="primary"
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
        >
          <Heading>New Password</Heading>

          <Box minW={{ base: "80%", md: "458px" }}>
            <Formik
              initialValues={{ newPassword: "" }}
              onSubmit={async (values, { setErrors }) => {
                const response = await changePassword({
                  newPassword: values.newPassword,
                  token:
                    typeof router.query.token === "string"
                      ? router.query.token
                      : "",
                });

                if (response.data?.changePassword.errors) {
                  const errorMap = toErrorMap(
                    response.data.changePassword.errors
                  );
                  if ("token" in errorMap) {
                    setError(errorMap.token);
                  } else {
                    setErrors(errorMap);
                    setError(
                      `${response.data.changePassword.errors[0].field} 
                    ${response.data.changePassword.errors[0].message}`
                    );
                  }
                } else if (response.data?.changePassword.user) {
                  // worked
                  router.push("/dashboard");
                }
              }}
            >
              {({ values, handleChange, isSubmitting }) => (
                <Form>
                  <Stack spacing={4} p="1rem">
                    <FormControl>
                      <FormLabel>New Password</FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <CFaUserAlt color="primary" />
                        </InputLeftElement>
                        <Input
                          boxShadow="md"
                          name="newPassword"
                          id="newPassword"
                          type="text"
                          borderColor="primary"
                          value={values.newPassword}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </FormControl>
                    <Button
                      borderRadius={0}
                      type="submit"
                      variant="solid"
                      width="full"
                      backgroundColor="primary"
                      color="tertiary"
                      marginTop={5}
                      marginBottom={5}
                      rounded="xl"
                      isLoading={isSubmitting}
                      _hover={{
                        backgroundColor: "tertiary",
                        color: "primary",
                        border: "2px",
                        borderColor: "primary",
                      }}
                    >
                      Set New Password
                    </Button>
                    {error && <Box color="red">{error}</Box>}
                    <FormControl>
                      <FormHelperText>
                        <Flex
                          justifyContent="center"
                          alignItems="center"
                          padding=".5rem"
                          color="primary"
                        >
                          <Text
                            color="blackAlpha.700"
                            marginRight={1}
                            fontSize="md"
                          >
                            Take me back to
                          </Text>
                          <Text color="blackAlpha.700" as="u" fontSize="md">
                            <Link href="/">Sign In</Link>
                          </Text>
                        </Flex>
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

export default withUrqlClient(createUrqlClient, { ssr: false })(ChangePassword);
