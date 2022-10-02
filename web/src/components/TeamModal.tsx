import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUsersQuery } from "../generated/graphql";
import { ProjectModalProps } from "../types";
import { createUrqlClient } from "../utils/createUrqlClient";

const TeamModal = (props: ProjectModalProps) => {
  const [{ data: users, fetching: usersFetch }] = useUsersQuery();
  const toast = useToast();
  const router = useRouter();
  const [availableUsers, setAvailableUsers] = useState(
    users?.users.map((u) => ({ ...u, selected: false }))
  );
  return (
    <Modal
      initialFocusRef={props.initialRef}
      finalFocusRef={props.finalRef}
      isOpen={props.isOpen}
      onClose={props.onClose}
      closeOnOverlayClick={false}
      size={{ base: "xs", sm: "sm", md: "lg" }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Member</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={8}>
          {!usersFetch && (
            <Formik initialValues={{}} onSubmit={() => {}}>
              {({ isSubmitting }) => (
                <Form>
                  <Box
                    overflowY="auto"
                    height="150px"
                    scrollBehavior="auto"
                    p={4}
                    borderColor="light-blue"
                    borderWidth={0.1}
                    borderRadius={"xl"}
                  >
                    {availableUsers?.map((u, udx) => {
                      return (
                        <Flex
                          width="full"
                          justifyContent={"space-between"}
                          fontSize={"1rem"}
                          key={u.email}
                          backgroundColor={u.selected ? "primary" : "white"}
                          color={u.selected ? "tertiary" : "secondary"}
                          onClick={() => {
                            availableUsers[udx].selected =
                              !availableUsers[udx].selected;
                            setAvailableUsers([...availableUsers]);
                          }}
                        >
                          me
                        </Flex>
                      );
                    })}
                  </Box>
                  {/* Submit button */}
                  <Box
                    width="full"
                    display="flex"
                    justifyContent="space-around"
                  >
                    <Button type="submit" isLoading={isSubmitting}>
                      Assign Users
                    </Button>
                    <Button onClick={props.onClose}>Cancel</Button>
                  </Box>
                </Form>
              )}
            </Formik>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(TeamModal);
