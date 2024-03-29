import { NextPage } from "next";
import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import { Form, Formik } from "formik";
import { useForgotPasswordMutation } from "../../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useState } from "react";
import Head from "next/head";

const CFaUserAlt = chakra(FaUserAlt);

const ForgotPassword: NextPage = () => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [disabled, setDisabled] = useState(false);
  const toast = useToast();

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
          color="primary"
        >
          <Heading>Forgot your password?</Heading>

          <Box minW={{ base: "80%", md: "458px" }}>
            <Text>
              Please enter the email address you&apos;d like your password reset
              information sent to
            </Text>
            <Formik
              initialValues={{ email: "" }}
              onSubmit={async (values) => {
                setDisabled(true);
                await forgotPassword({ email: values.email });
                if (!toast.isActive("forgot-password")) {
                  toast({
                    id: "forgot-password",
                    title: "Password Reset Sent",
                    description: "you should get an email soon",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    variant: "subtle",
                    containerStyle: {
                      color: "primary",
                    },
                    position: "top",
                  });
                }
              }}
            >
              {({ values, handleChange, isSubmitting }) => (
                <Form>
                  <Stack spacing={4} p="1rem">
                    <FormControl>
                      <FormLabel>Enter Email Address</FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <CFaUserAlt color="primary" />
                        </InputLeftElement>
                        <Input
                          boxShadow="md"
                          name="email"
                          id="email"
                          type="email"
                          borderColor="primary"
                          autoComplete="email"
                          value={values.email}
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
                      marginTop={5}
                      marginBottom={5}
                      rounded="xl"
                      disabled={disabled}
                      isLoading={isSubmitting}
                      color="tertiary"
                      backgroundColor="primary"
                      _hover={{
                        backgroundColor: "tertiary",
                        color: "primary",
                        border: "2px",
                        borderColor: "primary",
                      }}
                    >
                      Request Reset Link
                    </Button>
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

export default withUrqlClient(createUrqlClient, { ssr: false })(ForgotPassword);
