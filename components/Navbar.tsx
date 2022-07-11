import { NextPage } from 'next';
import {
  Box,
  chakra,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';

const CAiOutlineUsergroupAdd = chakra(AiOutlineUsergroupAdd);
const navbar = [
  { title: 'Dashboard', url: 'dashboard' },
  { title: 'Manage Roles', url: 'roles' },
  { title: 'Manage Project Users', url: 'users' },
  { title: 'My Projects', url: 'username/projects' },
  { title: 'My Tickets', url: 'username/tickets' },
  { title: 'User Profile', url: 'username' },
];

const NavBar: NextPage = () => {
  return (
    <Stack>
      {/* Home title, user imgage */}
      <Flex margin={3} flexDir='row' alignItems='center'>
        <Image
          w='35%'
          alt='user icon'
          src='https://cdn-icons-png.flaticon.com/512/236/236831.png'
        />
        <Heading as='h2' size={{ base: 'sm', xl: 'md' }} textAlign='center'>
          WELCOME user_name
        </Heading>
      </Flex>
      {/* Home navbar */}
      <Flex flexDir='column'>
        {navbar.map((item) => {
          return (
            <Box p={5} key={item.title}>
              <Flex flexDir='row' alignItems='center'>
                <CAiOutlineUsergroupAdd size='25px' />
                <Text fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}>
                  <Link href={item.url}>{item.title}</Link>
                </Text>
              </Flex>
            </Box>
          );
        })}
      </Flex>
    </Stack>
  );
};

export default NavBar;
