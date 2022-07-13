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
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import {
  MdNotificationsActive,
  MdNotificationsOff,
  MdMarkAsUnread,
} from 'react-icons/md';
import { FaArchive } from 'react-icons/Fa';
import { nanoid } from 'nanoid';
import { initialNotifications } from '../utils/dummyData';

const Notis = chakra(MdNotificationsActive);
const NoNotis = chakra(MdNotificationsOff);
const CArchive = chakra(FaArchive);
const CUnread = chakra(MdMarkAsUnread);

const Notifications: NextPage = () => {
  const [hasNotis, setHasNotis] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showArchived, setShowArchived] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  useEffect(() => {
    // axios call that grabs notifications.
    // if we get an array of unread notifications, setHasNotis to true
    // if ther are no nofications, render unforunately we have no notifications
    // sort the notifications by timestamp
    setHasNotis(true);
  }, []);

  const archiveHandler = (id: number, archivedState: boolean) => {
    setNotifications(
      notifications.map((noti) => {
        if (noti.id !== id) {
          return noti;
        } else {
          return { ...noti, archived: !archivedState };
        }
      })
    );
  };

  return (
    <>
      <Box>
        <Flex flexDirection='row' alignItems='center'>
          <Text marginRight={3}>Notifications</Text>
          {hasNotis ? (
            <Notis cursor='pointer' size='30px' onClick={onOpen} />
          ) : (
            <NoNotis cursor='pointer' size='30px' onClick={onOpen} />
          )}
        </Flex>
      </Box>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        scrollBehavior='inside'
        size='xl'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>Notifications</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent='space-between'>
              <Button
                onClick={() => setShowArchived(false)}
                colorScheme={showArchived ? 'gray' : 'facebook'}
              >
                Read
              </Button>
              <Button
                onClick={() => setShowArchived(true)}
                colorScheme={showArchived ? 'facebook' : 'gray'}
              >
                Unread
              </Button>
            </Flex>

            {hasNotis ? (
              <div>
                {notifications
                  .filter(
                    (notification) => notification.archived == showArchived
                  )
                  .map((notification) => {
                    return (
                      <Box p='1rem' key={nanoid()} w='full'>
                        <Flex flexDirection='row' alignItems='center'>
                          <Text w='85%'>{notification.message}</Text>
                          <Text marginRight='1rem'>{notification.date}</Text>
                          {showArchived ? (
                            <CUnread
                              onClick={() =>
                                archiveHandler(
                                  notification.id,
                                  notification.archived
                                )
                              }
                              cursor='pointer'
                              size='20px'
                              margin='auto'
                            />
                          ) : (
                            <CArchive
                              onClick={() =>
                                archiveHandler(
                                  notification.id,
                                  notification.archived
                                )
                              }
                              cursor='pointer'
                              size='20px'
                              margin='auto'
                            />
                          )}
                        </Flex>
                      </Box>
                    );
                  })}
              </div>
            ) : (
              <Flex justifyContent='space-around'>
                <Alert
                  status='warning'
                  width='80%'
                  marginTop='2rem'
                  padding='1rem'
                >
                  <AlertIcon /> Seems like you have no notifications
                </Alert>
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Notifications;
