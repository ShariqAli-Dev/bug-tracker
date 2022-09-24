import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { InputField } from "./InputField";

import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useEffect, useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useUsersQuery } from "../generated/graphql";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  finalRef: any;
  initialRef: any;
}

interface TeamMember {
  name: string;
  id: number;
  email: string;
  selected: boolean;
}

const TicketModal = ({
  isOpen,
  onClose,
  finalRef,
  initialRef,
}: TicketModalProps) => {
  const toast = useToast();
  const [{ data, fetching }] = useUsersQuery();
  const [team, setTeam] = useState<TeamMember[]>([]);
  console.log({ data, team });

  useEffect(() => {
    if (!fetching) {
      const teamData = data?.users.map((user) => {
        return { ...user, selected: false };
      });
      setTeam(teamData as TeamMember[]);
    }
  }, [data, fetching]);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      size={{ base: "xs", sm: "sm", md: "lg" }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Ticket</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={8}>
          <Formik
            initialValues={{
              title: "",
              description: "",
              team: [],
              type: "issue",
              priority: "low",
              status: "new",
            }}
            onSubmit={async (options) => {
              try {
                // do the api call to create the ticket
                // loop theough team and do logic related to submitting
                if (!toast.isActive("newProjectSuccess")) {
                  toast({
                    id: "newProjectSuccess",
                    title: "Project Sucess",
                    description: "We succesfully created the project",
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
                if (!toast.isActive("newProjectError")) {
                  toast({
                    id: "newProjectError",
                    title: "Project Error",
                    description:
                      "Unfortunately, we  could not create the project",
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
            }}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form>
                {/* Ticket Title */}
                <Box pb={2}>
                  <InputField
                    onChange={handleChange}
                    value={values.title}
                    name="title"
                    label="Title"
                    required
                  />
                </Box>
                {/* Ticket Description */}
                <Box pb={2}>
                  <InputField
                    onChange={handleChange}
                    value={values.description}
                    name="ticket"
                    label="Ticket Description"
                    textarea
                    required
                  />
                </Box>
                {/* Add Team Members */}
                {!fetching && (
                  <Box
                    overflowY="auto"
                    height="150px"
                    scrollBehavior="auto"
                    p={4}
                    borderColor="light-blue"
                    borderWidth={0.1}
                    borderRadius={"xl"}
                  >
                    {team.map((p, pdx) => {
                      return (
                        <Text
                          fontSize={"1rem"}
                          onClick={() => {
                            team[pdx].selected = !team[pdx].selected;
                            setTeam([...team]);
                          }}
                          backgroundColor={p.selected ? "primary" : "white"}
                          color={p.selected ? "tertiary" : "secondary"}
                          key={p.email}
                        >
                          {p.name}: {p.email}
                        </Text>
                      );
                    })}
                  </Box>
                )}
                <Flex
                  justifyContent="space-around"
                  alignItems="center"
                  marginTop={4}
                >
                  {/* Type */}
                  <Box pb={2}>
                    <FormControl>
                      <FormLabel>Type</FormLabel>
                      <Select
                        value={values.type}
                        id="type"
                        name="type"
                        onChange={handleChange}
                        required
                      >
                        <option value="issue">Issue</option>
                        <option value="bug">Bug</option>
                        <option value="feature">Feature</option>
                      </Select>
                    </FormControl>
                  </Box>
                  {/* Priority */}
                  <Box pb={2}>
                    <FormControl>
                      <FormLabel>Priority</FormLabel>
                      <Select
                        value={values.priority}
                        id="priority"
                        name="priority"
                        onChange={handleChange}
                        required
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="immediate">Immediate</option>
                      </Select>
                    </FormControl>
                  </Box>
                  {/* Status */}
                  <Box pb={2}>
                    <FormControl>
                      <FormLabel>Status</FormLabel>
                      <Select
                        value={values.status}
                        id="status"
                        name="Priority"
                        onChange={handleChange}
                        required
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </Select>
                    </FormControl>
                  </Box>
                </Flex>

                <Box width="full" display="flex" justifyContent="space-around">
                  <Button type="submit" isLoading={isSubmitting}>
                    Create Ticket
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </Box>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(TicketModal);
