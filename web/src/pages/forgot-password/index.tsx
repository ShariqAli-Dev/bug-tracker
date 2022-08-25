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
} from "@chakra-ui/react";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import { Formik } from "formik";

const CFaUserAlt = chakra(FaUserAlt);

const ForgotPassword: NextPage = () => {
  return (
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
      >
        <Heading>Forgot your password?</Heading>

        <Box minW={{ base: "80%", md: "458px" }}>
          <Text>
            Please enter the email address you&apos;d like your password reset
            information sent to
          </Text>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={() => {
              console.log("i do be submitting");
            }}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Stack spacing={4} p="1rem">
                <FormControl>
                  <FormLabel>Enter Email Address</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <CFaUserAlt color="gray.500" />
                    </InputLeftElement>
                    <Input
                      boxShadow="md"
                      name="email"
                      id="email"
                      type="email"
                      borderColor="blue"
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
                  colorScheme="facebook"
                  width="full"
                  marginTop={5}
                  marginBottom={5}
                  rounded="xl"
                  isLoading={isSubmitting}
                >
                  Request Reset Link
                </Button>
                <FormControl>
                  <FormHelperText>
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      padding=".5rem"
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
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
};

export default ForgotPassword;
