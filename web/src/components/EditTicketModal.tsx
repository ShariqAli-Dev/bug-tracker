import { withUrqlClient } from "next-urql";
import { ProjectModalProps } from "../types";
import { createUrqlClient } from "../utils/createUrqlClient";
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
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InputField } from "./InputField";
import { Ticket } from "../generated/graphql";

interface EditTicketModalProps extends ProjectModalProps {
  projectId: number;
  tickeId: number;
  ticketData: Ticket;
}

const EditTicketModal = ({
  initialRef,
  finalRef,
  isOpen,
  onClose,
  ticketData,
}: EditTicketModalProps) => {
  // const editTicket = useEditTicketMutation();

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
        <ModalHeader>I am modal header</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={8}>
          <Formik
            initialValues={{ ...ticketData }}
            onSubmit={async (options, { resetForm }) => {
              console.log(options);
            }}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form>
                {/* Ticket Title */}
                <Box
                  pb={2}
                  onClick={() => {
                    console.log(values);
                  }}
                >
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
                  {/* {team.map((p, pdx) => {
                    return (
                      <Flex
                        width="full"
                        justifyContent={"space-between"}
                        fontSize={"1rem"}
                        onClick={() => {
                          team[pdx].selected = !team[pdx].selected;
                          setTeam([...team]);
                        }}
                        backgroundColor={p.selected ? "primary" : "white"}
                        color={p.selected ? "tertiary" : "secondary"}
                        key={p.email}
                      >
                        <Box>{p.name}</Box> <Box>{p.email}</Box>
                      </Flex>
                    );
                  })} */}
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

export default withUrqlClient(createUrqlClient)(EditTicketModal);
