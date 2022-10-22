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
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useEffect, useState } from "react";
import {
  AssignedDeveloper,
  AssignedPersonnel,
  Ticket,
  useArchiveTicketMutation,
  useAssignedDevelopersQuery,
  useAssignedPersonnelQuery,
  useDeleteTicketMutation,
  useUpdateTicketMutation,
} from "../generated/graphql";
import { ProjectModalProps } from "../types";
import { createUrqlClient } from "../utils/createUrqlClient";
import { InputField } from "./InputField";

interface EditTicketModalProps extends ProjectModalProps {
  projectId: number;
  ticketData: Ticket;
}

interface TeamMember {
  id: number;
  name: string;
  selected: boolean;
  email: string;
  changed: boolean;
}

const EditTicketModal = ({
  initialRef,
  finalRef,
  isOpen,
  onClose,
  ticketData,
  projectId,
}: EditTicketModalProps) => {
  const [{ data: assignedPersonnel, fetching: personnelFetch }] =
    useAssignedPersonnelQuery({ variables: { projectId } });
  const [{ data: assignedDevelopers, fetching: developerFetch }] =
    useAssignedDevelopersQuery({ variables: { ticketId: ticketData.id } });
  const [, updateTicket] = useUpdateTicketMutation();
  const [, deleteTicket] = useDeleteTicketMutation();
  const [, archiveTicket] = useArchiveTicketMutation();
  const [team, setTeam] = useState<
    AssignedPersonnel[] | AssignedDeveloper[] | any
  >([]);

  useEffect(() => {
    if (
      personnelFetch ||
      developerFetch ||
      typeof assignedDevelopers === "undefined" ||
      typeof assignedPersonnel === "undefined"
    ) {
      return;
    } else {
      const assignedDevHash = {} as any; // {name: id}
      assignedDevelopers.assignedDevelopers.forEach(({ user }) => {
        if (!assignedDevHash[user.name]) {
          assignedDevHash[user.name] = user.id;
        }
      });
      setTeam(
        assignedPersonnel.assignedPersonnel.map(({ user }) => {
          if (assignedDevHash[user.name]) {
            return { ...user, selected: true, changed: false };
          } else {
            return { ...user, selected: false, changed: false };
          }
        })
      );
    }
  }, [personnelFetch, developerFetch, assignedPersonnel, assignedDevelopers]);

  if (personnelFetch || developerFetch) {
    return <div></div>;
  }

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
        <ModalHeader>Edit Ticket</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={8}>
          <Formik
            initialValues={{ ...ticketData }}
            onSubmit={async (
              { projectId, updatedAt, creator, __typename, ...options },
              { resetForm }
            ) => {
              let filteredTeam = team.filter(
                (member: TeamMember) => member.changed
              ) as TeamMember[] | any;
              filteredTeam = filteredTeam.map((member: TeamMember) => ({
                email: member.email,
                id: member.id,
                name: member.name,
                selected: member.selected,
              }));
              updateTicket({ options, team: filteredTeam });
              // invalidation
              resetForm();
            }}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form>
                {/* Ticket Title */}
                <Box pb={2}>
                  <InputField
                    onChange={handleChange}
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
                    name="description"
                    label="Ticket Description"
                    textarea
                    required
                  />
                </Box>
                {/* Add Team Members */}
                <Box
                  overflowY="auto"
                  height="150px"
                  scrollBehavior="auto"
                  p={4}
                  borderColor="light-blue"
                  borderWidth={0.1}
                  borderRadius={"xl"}
                >
                  {team.map((p: TeamMember, pdx: number) => {
                    return (
                      <Flex
                        width="full"
                        justifyContent={"space-between"}
                        fontSize={"1rem"}
                        onClick={() => {
                          team[pdx].selected = !team[pdx].selected;
                          team[pdx].changed = !team[pdx].changed;

                          setTeam([...team]);
                        }}
                        backgroundColor={p.selected ? "primary" : "white"}
                        color={p.selected ? "tertiary" : "secondary"}
                        key={p.name + p.email}
                      >
                        <Box>{p.name}</Box> <Box>{p.email}</Box>
                      </Flex>
                    );
                  })}
                </Box>
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
                        name="status"
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
                    Confirm
                  </Button>
                  <Button
                    onClick={async () => {
                      await archiveTicket({ archiveTicketId: ticketData.id });
                      onClose();
                    }}
                  >
                    Archive
                  </Button>
                  <Button
                    onClick={async () => {
                      if (assignedDevelopers) {
                        await deleteTicket({
                          ticketId: ticketData.id,
                          team: assignedDevelopers.assignedDevelopers.map(
                            ({ userId }) => ({ userId })
                          ),
                        });
                      }
                      await deleteTicket({
                        ticketId: ticketData.id,
                        team: [],
                      });

                      onClose();
                      return true;
                    }}
                  >
                    Delete
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

export default withUrqlClient(createUrqlClient)(EditTicketModal);
