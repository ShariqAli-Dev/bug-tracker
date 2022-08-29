import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { MutableRefObject, useState } from "react";
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
            }}
            onSubmit={() => {
              console.log("i do be formik submitting");
            }}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form>
                {/* Project Name */}
                <Box pb={2}>
                  <InputField name="name" label="name" />
                </Box>
                {/* Project Description */}
                <Box pb={2}>
                  <InputField name="description" label="description" textarea />
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
              </Form>
            )}
          </Formik>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              console.log("sending create quest");
            }}
          >
            Send notification
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProjectModal;
