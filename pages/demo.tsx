import {
  Box,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Link from 'next/link';
import { FaBug } from 'react-icons/fa';

const avatars = [
  {
    role: 'Admin',
    url: 'https://cdn-icons-png.flaticon.com/512/236/236831.png',
  },
  {
    role: 'Project Manager',
    url: 'https://cdn-icons.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1657069173~hmac=3a14a544d17ad13ad852d627238857b1',
  },
  {
    role: 'Developer',
    url: 'https://cdn-icons-png.flaticon.com/512/146/146031.png',
  },
  {
    role: 'Submitter',
    url: 'https://cdn-icons-png.flaticon.com/512/147/147142.png',
  },
];

const Demo: NextPage = () => {
  return (
    <Flex
      flexDirection='column'
      width='100wh'
      height='100vh'
      backgroundColor='blackAlpha.700'
      justifyContent='center'
      alignItems='center'
    >
      <Stack
        flexDir='column'
        mb='2'
        justifyContent='center'
        alignItems='center'
        backgroundColor='white'
        boxShadow='md'
        p={{ base: '1rem' }}
        rounded='xl'
      >
        {/* Heading */}
        <Flex justifyContent='center' alignItems='center'>
          <FaBug style={{ margin: '1rem' }} size={45} />
          <Heading>Demo-User Login</Heading>
        </Flex>
        {/* Users */}
        <SimpleGrid
          columns={2}
          spacingX={{ base: '10px', sm: '30px', md: '50px', lg: '80px' }}
          spacingY={{ base: '40px', sm: '60px', md: '80px' }}
        >
          {avatars.map((avatar) => {
            return (
              <Box key={avatar.url}>
                <Flex
                  justifyContent='center'
                  alignItems='center'
                  flexDirection='column'
                >
                  <Image w='35%' alt='user icon' src={avatar.url} />
                  <Text fontSize='xl'>{avatar.role}</Text>
                </Flex>
              </Box>
            );
          })}
        </SimpleGrid>
        {/* Hyperlink */}
        <Flex justifyContent='center' alignItems='center' padding='.5rem'>
          <Text color='blackAlpha.700' marginRight={1} fontSize='lg'>
            Take me back to
          </Text>
          <Text color='blackAlpha.700' as='u' fontSize='lg'>
            <Link href='/'>Sign In</Link>
          </Text>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Demo;
