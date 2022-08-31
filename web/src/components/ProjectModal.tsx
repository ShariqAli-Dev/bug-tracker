import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { MutableRefObject, useState } from "react";
import { useCreateProjectMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

import { InputField } from "./InputField";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRef: MutableRefObject<null>;
  finalRef: MutableRefObject<null>;
}

const ProjectModal = (props: ProjectModalProps) => {
  const { isOpen, onClose, initialRef, finalRef } = props;
  const [team, setTeam] = useState([
    { name: "shariq", selected: false },
    { name: "john", selected: false },
  ]);
  const [, createProject] = useCreateProjectMutation();
  const toast = useToast();

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
        <ModalHeader>Create Project</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={8}>
          <Formik
            initialValues={{
              name: "",
              description: "",
            }}
            onSubmit={async (options) => {
              try {
                await createProject({ options });
                // update state
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
                {/* Project Name */}
                <Box pb={2}>
                  <InputField
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    label="name"
                    required
                  />
                </Box>
                {/* Project Description */}
                <Box pb={2}>
                  <InputField
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    label="description"
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
                        key={p.name}
                      >
                        {p.name}
                      </Text>
                    );
                  })}
                </Box>
                <Box width="full" display="flex" justifyContent="space-around">
                  <Button type="submit" isLoading={isSubmitting}>
                    Send notification
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

export default withUrqlClient(createUrqlClient)(ProjectModal);
