import type { NextPage } from 'next';
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';

const Home: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection='column'
      width='100wh'
      height='100vh'
      backgroundColor='gray.200'
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
        p={{ base: '1rem', sm: '2rem', md: '3rem', lg: '5rem' }}
      >
        {/* HEADING */}
        <Flex>
          <Avatar />
          <Heading>Bug Tracker Login</Heading>
        </Flex>

        {/* FORM  */}
        <Box minW={{ base: '90%', md: '458px' }}>
          <form>
            <Stack spacing={4} p='1rem'>
              {/* EMAIL */}
              <FormControl>
                <InputGroup>
                  {/* <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300"/>}/> */}
                  <Input type='email' placeholder='Email Address' />
                </InputGroup>
              </FormControl>
              {/* PASSWORD */}
              <FormControl>
                <InputGroup>
                  {/* <InputLeftElement pointerEvents='none' color='gray.300' children={<CFaLock color='gray.300'/>}/> */}
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                  />
                  <InputRightElement>
                    <Button
                      width='4.5rem'
                      size='sm'
                      onClick={handleShowPassword}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {/* BOTTOM  LINKS */}
                <FormHelperText textAlign='center'>
                  <div>
                    Forgot your{' '}
                    <Text as='u'>
                      <Link href='forgot'>Password?</Link>
                    </Text>
                  </div>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type='submit'
                variant='solid'
                colorScheme='blue'
                width='full'
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Home;
