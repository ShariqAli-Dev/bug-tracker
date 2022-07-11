import { Flex, Heading, Image, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

const Dashboard: NextPage = () => {
  return (
    <Flex h='100vh' flexDir='row' overflow='hidden' maxW='2000px'>
      {/* Dashboard Menu */}
      <Flex backgroundColor='grey' w='15%' flexDir='column' alignItems='center'>
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
          <Flex></Flex>
        </Stack>
      </Flex>

      {/* Components */}
      <Flex></Flex>
    </Flex>
  );
};

export default Dashboard;
