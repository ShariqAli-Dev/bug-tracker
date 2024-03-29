import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { MutableRefObject } from "react";
import { useDeleteProjectMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

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
  const router = useRouter();
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
              <Button
                ref={cancelRef}
                onClick={onClose}
                borderRadius={0}
                backgroundColor="tertiary"
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
              <Button
                color="tertiary"
                backgroundColor="primary"
                border="2px"
                rounded="xl"
                onClick={async () => {
                  await deleteProject({
                    projectId,
                  });
                  onClose();
                  router.push("/dashboard");
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

export default withUrqlClient(createUrqlClient)(DeleteProjectAlert);
