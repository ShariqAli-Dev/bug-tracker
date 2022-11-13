import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { useDeleteUserMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface AlertProps {
  isOpen: boolean;
  cancelRef: MutableRefObject<any>;
  onClose: () => void;
  userId: number;
  setSelectedUser: Dispatch<
    SetStateAction<
      | {
          name: string;
          id: number;
          email: string;
          role: string;
        }
      | undefined
    >
  >;
}

const DeleteTicketAlert = ({
  isOpen,
  cancelRef,
  onClose,
  userId,
  setSelectedUser,
}: AlertProps) => {
  const toast = useToast();
  const [, deleteUser] = useDeleteUserMutation();
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
                onClick={async () => {
                  try {
                    await deleteUser({ deleteUserId: userId });
                    if (!toast.isActive("delete-user")) {
                      toast({
                        id: "delete-user",
                        title: "Delete User",
                        description: "succesfully deleted user",
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
                  } catch (err) {
                    if (!toast.isActive("delete-user-err")) {
                      toast({
                        id: "delete-user-err",
                        title: "Request Failed",
                        description: "could not process request",
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

                  onClose();
                  setSelectedUser(undefined);
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

export default withUrqlClient(createUrqlClient)(DeleteTicketAlert);
