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
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import {
  Project,
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { InputField } from "./InputField";

interface ProjectModalProps {
  isEditing?: boolean;
  project?: Project;
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
  project,
  isEditing,
}: ProjectModalProps) => {
  const toast = useToast();
  const [, createProject] = useCreateProjectMutation();
  const [, updateProject] = useUpdateProjectMutation();
  const router = useRouter();

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
              name: project?.name || "",
              description: project?.description || "",
            }}
            onSubmit={async (options) => {
              try {
                if (isEditing) {
                  await updateProject({
                    options: {
                      id: parseInt(project?.id as any),
                      name: options.name,
                      description: options.description,
                    },
                  });
                  router.reload();
                } else {
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
                }
                onClose();
              } catch {
                if (!toast.isActive("newProjectError")) {
                  toast({
                    id: "newProjectError",
                    title: "Project Error",
                    description:
                      "Unfortunately, we could not create the project",
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
                    {isEditing ? "Edit" : "Create"} Project
                  </Button>
                  <Button
                    onClick={onClose}
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
                  >
                    Cancel
                  </Button>
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
