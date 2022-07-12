import type { NextPage } from 'next';
import { Box, Flex, Text } from '@chakra-ui/react';
import QueryForm from './QueryForm';

const DashHeader: NextPage = () => {
  return (
    <Flex
      backgroundColor='orange'
      w='full'
      h='7%'
      justifyContent='space-between'
      alignItems='center'
    >
      {/* Logged in as Admin */}
      <Box>
        <Flex justifyContent='center' alignItems='center' padding='.5rem'>
          <Text color='blackAlpha.700' marginRight={1} fontSize='md'>
            Logged in as:
          </Text>
          <Text color='blackAlpha.700' as='u' fontSize='md'>
            Admin
          </Text>
        </Flex>
      </Box>

      {/* searchbar, notis, user profile */}
      <Box>
        <Flex alignItems='center' padding='.5rem'>
          <QueryForm />
          <h1>Notifications</h1>
          <h1>User Profile</h1>
        </Flex>
      </Box>
    </Flex>
  );
};

export default DashHeader;
