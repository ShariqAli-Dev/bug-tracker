import {
  chakra,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { FaUserAlt } from 'react-icons/fa';

const UserAvatar = chakra(FaUserAlt);

const UserActions: NextPage = () => {
  const router = useRouter();

  const logoutUser = () => {
    router.push('/');
  };

  return (
    <Menu closeOnSelect={true}>
      <MenuButton>
        <Flex justifyContent='space-around' alignItems='center'>
          <Text display={{ base: 'none', md: 'flex' }} margin='1rem'>
            User Actions
          </Text>
          <UserAvatar size='25px' />
        </Flex>
      </MenuButton>
      <MenuList minWidth='240px'>
        <MenuItem onClick={() => router.push('profile')}>Profile</MenuItem>
        <MenuItem onClick={() => router.push('settings')}>Settings</MenuItem>
        <MenuDivider />
        <MenuItem onClick={logoutUser}>Log Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserActions;
