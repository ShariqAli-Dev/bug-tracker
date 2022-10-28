import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { MutableRefObject } from "react";
import { useDeleteProjectMutation } from "../generated/graphql";

interface AlertProps {
  isOpen: boolean;
  cancelRef: MutableRefObject<any>;
  projectId: number;
  onClose: () => void;
}

const DeleteProjectAlert = ({
  isOpen,
  cancelRef,
  projectId,
  onClose,
}: AlertProps) => {
  const [, deleteProject] = useDeleteProjectMutation();
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You cant undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                color="tertiary"
                backgroundColor="primary"
                border="2px"
                margin={2}
                padding={1}
                onClick={async () => {
                  await deleteProject({
                    projectId,
                  });
                  onClose();
                }}
                ml={3}
                _hover={{
                  backgroundColor: "tertiary",
                  color: "primary",
                  border: "2px",
                  borderColor: "primary",
                }}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteProjectAlert;
