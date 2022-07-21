import type { NextPage } from 'next';
import { Box, Flex, Text } from '@chakra-ui/react';
import QueryForm from './QueryForm';
import Notifications from './Notifications';
import UserActions from './UserActions';
import BurgerMenu from './BurgerMenu';

const DashHeader: NextPage = () => {
  return (
    <Flex
      backgroundColor='white'
      w='full'
      h='7%'
      justifyContent='space-between'
      alignItems='center'
      boxShadow='xl'
    >
      {/* Logged in as Admin */}
      <Box display={{ base: 'none', md: 'inline' }}>
        <Flex justifyContent='center' alignItems='center' padding='.5rem'>
          <Text color='blackAlpha.700' marginRight={1} fontSize='lg'>
            Logged in as:{' '}
            <span
              style={{
                textDecoration: 'underline',
              }}
            >
              Admin
            </span>
          </Text>
        </Flex>
      </Box>

      {/* searchbar, notis, user profile */}
      <Box w={{ base: 'full', md: '65%', xl: '45%' }}>
        <Flex justifyContent='space-around' alignItems='center' padding='1rem'>
          <BurgerMenu />
          <QueryForm />
          <Notifications />
          <UserActions />
        </Flex>
      </Box>
    </Flex>
  );
};

export default DashHeader;
