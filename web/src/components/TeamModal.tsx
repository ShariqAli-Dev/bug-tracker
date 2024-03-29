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
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useEffect, useState } from "react";
import {
  useAssignUsersMutation,
  useAvailableUsersQuery,
  useMeQuery,
} from "../generated/graphql";
import { ProjectModalProps, User } from "../types";
import { createUrqlClient } from "../utils/createUrqlClient";

interface TeamModalProps extends ProjectModalProps {
  projectId: number;
  isAddingUser: boolean;
}

const TeamModal = (props: TeamModalProps) => {
  const [{ data: me, fetching: meFetch }] = useMeQuery();
  const [{ data, fetching }] = useAvailableUsersQuery({
    variables: { projectId: props.projectId, isAdding: props.isAddingUser },
  });
  const toast = useToast();
  const [availableUsers, setAvailableUsers] = useState<any>([]);
  const [, assignUsers] = useAssignUsersMutation();

  useEffect(() => {
    if (!fetching && !meFetch) {
      setAvailableUsers(
        data?.availableUsers
          .filter((u) => u.id !== me?.me?.id)
          .map((u) => ({ ...u, selected: false }))
      );
    }
    return;
  }, [data, fetching, meFetch, me]);

  if (fetching || meFetch) {
    return <></>;
  }

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
          {!fetching && !meFetch && (
            <Formik
              initialValues={{}}
              onSubmit={async () => {
                try {
                  const filteredTeam = availableUsers
                    .filter((m: { selected: boolean }) => m.selected)
                    .map((m: { id: number }) => ({ id: m.id }));
                  await assignUsers({
                    projectId: props.projectId,
                    team: filteredTeam,
                    isAdding: props.isAddingUser,
                  });
                  if (!toast.isActive("assignedUsersSuccess")) {
                    toast({
                      id: "assignedUsersSuccess",
                      title: "Success",
                      description: "We succesfully assigned the users",
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
                } catch {
                  if (!toast.isActive("assignedUsersError")) {
                    toast({
                      id: "assignedUsersError",
                      title: "Assigning Error",
                      description:
                        "Unfortunately, we  could not assign the users",
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
                }
                props.onClose();
              }}
            >
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
                    {availableUsers?.map(
                      (u: User & { selected: boolean }, udx: number) => (
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
                          <Box
                            display="flex"
                            justifyContent="space-around"
                            width="full"
                          >
                            <Text>{u.name}</Text>
                            <Text>{u.email}</Text>
                          </Box>
                        </Flex>
                      )
                    )}
                  </Box>
                  {/* Submit button */}
                  <Box
                    width="full"
                    display="flex"
                    justifyContent="space-around"
                  >
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      borderRadius={0}
                      backgroundColor="primary"
                      width="45%"
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
                    >
                      Asssign Users
                    </Button>
                    <Button
                      // onClick={onClose}
                      borderRadius={0}
                      backgroundColor="tertiary"
                      width="45%"
                      marginTop={5}
                      marginBottom={5}
                      rounded="xl"
                      color="primary"
                      border="2px"
                      borderColor="primary"
                      _hover={{
                        backgroundColor: "primary",
                        color: "tertiary",
                      }}
                      onClick={props.onClose}
                    >
                      Cancel
                    </Button>
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

export default withUrqlClient(createUrqlClient)(TeamModal);
