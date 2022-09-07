import {
  Alert,
  AlertIcon,
  Box,
  Button,
  chakra,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import {
  MdArchive,
  MdMarkAsUnread,
  MdNotificationsActive,
  MdNotificationsOff,
} from "react-icons/md";
import {
  useUpdateNotificationMutation,
  useUserNotificationsQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Notis = chakra(MdNotificationsActive);
const NoNotis = chakra(MdNotificationsOff);
const CArchive = chakra(MdArchive);
const CUnread = chakra(MdMarkAsUnread);

interface notificationHandlerType {
  id: number;
  read: boolean;
}

const Notifications = () => {
  const [{ data }] = useUserNotificationsQuery();
  const [, updateNotification] = useUpdateNotificationMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showRead, setShowRead] = useState(false);

  const notificationHandler = async (options: notificationHandlerType) => {
    await updateNotification({ options });
  };

  return (
    <Box>
      <Flex flexDirection="row" alignItems="center">
        <Text
          color="primary"
          display={{ base: "none", md: "flex" }}
          marginRight={3}
        >
          Notifications
        </Text>

        {data?.userNotifications[0] ? (
          <Notis
            color="secondary"
            cursor="pointer"
            size="30px"
            onClick={onOpen}
          />
        ) : (
          <NoNotis
            color="secondary"
            cursor="pointer"
            size="30px"
            onClick={onOpen}
          />
        )}
      </Flex>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        scrollBehavior="inside"
        size={{ base: "sm", sm: "md", md: "xl" }}
      >
        <ModalOverlay />
        <ModalContent color="primary">
          <ModalHeader textAlign="center">Notifications</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent="space-between">
              <Button
                color={showRead ? "primary" : "tertiary"}
                backgroundColor={showRead ? "tertiary" : "primary"}
                border={showRead ? "2px" : 0}
                borderColor={showRead ? "primary" : ""}
                onClick={() => setShowRead(false)}
              >
                New Messages
              </Button>
              <Button
                color={showRead ? "tertiary" : "primary"}
                backgroundColor={showRead ? "primary" : "tertiary"}
                border={showRead ? 0 : "2px"}
                borderColor={showRead ? "" : "primary"}
                onClick={() => setShowRead(true)}
              >
                Viewed Messages
              </Button>
            </Flex>

            {data?.userNotifications[0] ? (
              <Box>
                {data.userNotifications
                  .filter((noti) => noti.read == showRead)
                  .map((noti) => (
                    <Box key={noti.id} p="1rem" w="full">
                      <Flex>
                        <Text w="75%">{noti.message}</Text>
                        <Text fontSize="md" marginRight="1rem">
                          {noti.createdAt.slice(0, 10)}
                        </Text>

                        {showRead ? (
                          <CUnread
                            color="secondary"
                            onClick={() =>
                              notificationHandler({
                                id: noti.id,
                                read: noti.read,
                              })
                            }
                            cursor="pointer"
                            size="20px"
                            margin="auto"
                          />
                        ) : (
                          <CArchive
                            color="secondary"
                            onClick={() =>
                              notificationHandler({
                                id: noti.id,
                                read: noti.read,
                              })
                            }
                            cursor="pointer"
                            size="20px"
                            margin="auto"
                          />
                        )}
                      </Flex>
                    </Box>
                  ))}
              </Box>
            ) : (
              <Flex justifyContent="space-around">
                <Alert
                  status="warning"
                  width="80%"
                  marginTop="2rem"
                  padding="1rem"
                >
                  <AlertIcon /> Seems like you have no notifications
                </Alert>
              </Flex>
            )}
          </ModalBody>
          <ModalFooter display="flex" justifyContent="center">
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Notifications);
