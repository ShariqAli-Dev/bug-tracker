import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import BurgerMenu from "../components/BurgerMenu";
import DeleteUserAlert from "../components/DeleteUserAlert";
import NavBar from "../components/Navbar";
import {
  useChangeRoleMutation,
  useMeQuery,
  useUsersQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Adminstration: NextPage = () => {
  const [{ data: users, fetching }] = useUsersQuery();
  const [selectedUser, setSelectedUser] = useState<
    undefined | { name: string; id: number; email: string; role: string }
  >(undefined);
  const [, changeRole] = useChangeRoleMutation();
  const [{ data: me, fetching: meFetch }] = useMeQuery();
  const cancelRef = useRef();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  });
  return <>INVALID PAGE</>;

  if (fetching || meFetch) {
    return <></>;
  }

  if (me?.me?.role !== "admin") {
    router.push("/dashboard");
    return <></>;
  } else {
    return (
      <>
        <Head>
          <title>Bug Tracker - Adminstration</title>
          <meta name="Adminstration Page" content="Admin control page" />
        </Head>
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
                <BurgerMenu pageProps={{}} />
              </Box>
              <Text
                width={{ base: "95%", sm: "100%" }}
                align="center"
                fontSize="3xl"
                color="primary"
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
                <Text fontWeight="semibold" align="center" color="primary">
                  Organization
                </Text>
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
                  {users?.users.map((u, udx) => (
                    <Flex
                      width="full"
                      justifyContent={"space-between"}
                      fontSize={"1rem"}
                      key={u.email}
                      cursor="pointer"
                      onClick={() => setSelectedUser(users?.users[udx])}
                      color="primary"
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
                <Text fontWeight="bold" align="center" color="primary">
                  Edit User Information
                </Text>
                <Box
                  overflowY="auto"
                  scrollBehavior="auto"
                  height="full"
                  width="full"
                  borderColor="light-blue"
                  borderWidth={0.1}
                  borderRadius={"xl"}
                  paddingTop="1rem"
                  color="primary"
                >
                  {selectedUser && (
                    <>
                      <Text fontSize="3xl" marginLeft="1rem" color="primary">
                        {selectedUser?.name}
                      </Text>
                      <Flex marginLeft="1rem">
                        <Text fontWeight="semibold" fontSize="md">
                          Email:
                        </Text>
                        <Text marginLeft="1rem">{selectedUser?.email}</Text>
                      </Flex>
                      <Formik
                        initialValues={{ ...selectedUser }}
                        onSubmit={async (options: any) => {
                          await changeRole({ role: options.role });
                        }}
                      >
                        {({ values, handleChange }) => (
                          <Form>
                            <FormControl width="full">
                              <Flex alignItems="center">
                                <FormLabel
                                  fontSize="md"
                                  color="primary"
                                  fontWeight="semibold"
                                  paddingLeft="1rem"
                                >
                                  Role
                                </FormLabel>
                                <Select
                                  value={values.role}
                                  id="role"
                                  name="role"
                                  onChange={handleChange}
                                  width="60%"
                                  marginLeft="1rem"
                                >
                                  <option value="admin">Admin</option>
                                  <option value="project manager">
                                    Project Manager
                                  </option>
                                  <option value="submitter">Submitter</option>
                                  <option value="developer">Developer</option>
                                </Select>
                              </Flex>
                            </FormControl>
                            <Flex
                              width="full"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Button
                                size="sm"
                                type="submit"
                                color="tertiary"
                                backgroundColor="primary"
                                border="2px"
                                margin={2}
                                padding={1}
                                _hover={{
                                  backgroundColor: "tertiary",
                                  color: "primary",
                                  border: "2px",
                                  borderColor: "primary",
                                }}
                              >
                                Submit
                              </Button>
                              <Button
                                size="sm"
                                color="tertiary"
                                backgroundColor="primary"
                                border="2px"
                                margin={2}
                                padding={1}
                                _hover={{
                                  backgroundColor: "tertiary",
                                  color: "primary",
                                  border: "2px",
                                  borderColor: "primary",
                                }}
                                onClick={() => onOpen()}
                              >
                                Remove User
                              </Button>
                            </Flex>
                          </Form>
                        )}
                      </Formik>
                    </>
                  )}
                </Box>
              </Box>
            </Flex>
          </Flex>
        </Flex>
        <DeleteUserAlert
          pageProps={{}}
          cancelRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
          userId={selectedUser?.id}
          setSelectedUser={setSelectedUser}
        />
      </>
    );
  }
};

export default withUrqlClient(createUrqlClient)(Adminstration);
