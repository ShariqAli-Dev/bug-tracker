import {
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
import { MdNotificationsActive, MdNotificationsOff } from 'react-icons/md';

const Notis = chakra(MdNotificationsActive);
const NoNotis = chakra(MdNotificationsOff);

const Notifications: NextPage = () => {
  const [hasNotis, setHasNotis] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // axios call that grabs notifications.
    // if we get an array of unread notifications, setHasNotis to true
  }, []);

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

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notifications</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1>testing</h1>
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
