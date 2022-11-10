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
import { MutableRefObject } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";

interface AlertProps {
  isOpen: boolean;
  cancelRef: MutableRefObject<any>;
  onClose: () => void;
}

const DeleteTicketAlert = ({ isOpen, cancelRef, onClose }: AlertProps) => {
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
              Delete User
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
                onClick={async () => {}}
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

export default withUrqlClient(createUrqlClient)(DeleteTicketAlert);
