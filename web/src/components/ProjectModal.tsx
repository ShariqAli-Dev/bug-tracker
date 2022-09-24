import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { InputField } from "./InputField";

import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useCreateProjectMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  finalRef: any;
  initialRef: any;
}

const ProjectModal = ({
  isOpen,
  onClose,
  finalRef,
  initialRef,
}: ProjectModalProps) => {
  const toast = useToast();
  const [, createProject] = useCreateProjectMutation();

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
                    label="Name"
                    required
                  />
                </Box>
                {/* Project Description */}
                <Box pb={2}>
                  <InputField
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    label="Description"
                    textarea
                    required
                  />
                </Box>

                <Box width="full" display="flex" justifyContent="space-around">
                  <Button type="submit" isLoading={isSubmitting}>
                    Create Project
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

export default withUrqlClient(createUrqlClient, { ssr: true })(ProjectModal);
