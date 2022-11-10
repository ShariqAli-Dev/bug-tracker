import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import BurgerMenu from "../components/BurgerMenu";
import NavBar from "../components/Navbar";
import { useUsersQuery, Users } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Adminstration: NextPage = () => {
  const [{ data: users, fetching }] = useUsersQuery();
  const [selectedUser, setSelectedUser] = useState<
    undefined | { name: string; id: number; email: string; role: string }
  >(undefined);

  if (fetching) {
    return <></>;
  }
  console.log(users?.users[0]);

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
              {users?.users.map((u, udx) => (
                <Flex
                  width="full"
                  justifyContent={"space-between"}
                  fontSize={"1rem"}
                  key={u.email}
                  cursor="pointer"
                  onClick={() => setSelectedUser(users.users[udx])}
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
              <Text fontSize="3xl" marginLeft="1rem" color="primary">
                {selectedUser?.name}
              </Text>
              <Flex marginLeft="1rem">
                <Text fontWeight="semibold" color="primary" fontSize="md">
                  Email:
                </Text>
                <Text marginLeft="1rem">{selectedUser?.email}</Text>
              </Flex>
              <Formik
                initialValues={{ ...selectedUser }}
                onSubmit={async (options) => {}}
              >
                {({ values, handleChange, isSubmitting }) => (
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
                          width="40%"
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
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default withUrqlClient(createUrqlClient)(Adminstration);