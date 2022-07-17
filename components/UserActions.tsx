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

import { FaUserAlt } from 'react-icons/fa';

const UserAvatar = chakra(FaUserAlt);

const UserActions: NextPage = () => {
  return (
    <Menu closeOnSelect={true}>
      <MenuButton>
        <Flex justifyContent='space-around' alignItems='center'>
          <Text margin='1rem'>User Actions</Text>
          <UserAvatar size='20px' />
        </Flex>
      </MenuButton>
      <MenuList minWidth='240px'>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuDivider />
        <MenuItem>Log Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserActions;
