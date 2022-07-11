import { Box, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Link from 'next/link';

const navbar = [
  { title: 'Dashboard Home' },
  { title: 'Manage Role Assignment' },
  { title: 'Manage Project Users' },
  { title: 'My Projects' },
  { title: 'My Tickets' },
  { title: 'User Profile' },
];

const Dashboard: NextPage = () => {
  return (
    <Flex h='100vh' flexDir='row' overflow='hidden' maxW='2000px'>
      {/* Dashboard Menu */}
      <Flex w='15%' flexDir='column' alignItems='center'>
        <Stack>
          {/* Dashboard title, user imgage */}
          <Flex flexDir='row' alignItems='center'>
            <Image
              w='35%'
              alt='user icon'
              src='https://cdn-icons-png.flaticon.com/512/236/236831.png'
            />
            <Heading as='h2' size={{ base: 'sm', xl: 'md' }} textAlign='center'>
              Welcome user_name
            </Heading>
          </Flex>
          {/* dashboard navbar */}
          <Flex flexDir='column' alignItems='flex-start'>
            {navbar.map((item) => {
              return (
                <Box p={4} key={item.title}>
                  <Text>
                    <Link href='#'>{item.title}</Link>
                  </Text>
                </Box>
              );
            })}
          </Flex>
        </Stack>
      </Flex>

      {/* Components */}
      <Flex backgroundColor='grey' w='full'></Flex>
    </Flex>
  );
};

export default Dashboard;
