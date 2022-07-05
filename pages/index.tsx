import type { NextPage } from 'next';
import {
  Box,
  Button,
  chakra,
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
import { FaUserAlt, FaLock, FaBug } from 'react-icons/fa';

const helperTexts = [
  { text: 'Forgot your', hyperText: 'Password?', url: 'forgot' },
  { text: 'Create an account?', hyperText: 'Sign Up', url: 'signup' },
  { text: 'Sign in as a', hyperText: 'Demo User', url: 'demo' },
];

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

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
        <Flex justifyContent='center' alignItems='center'>
          <div style={{ margin: '1rem' }}>
            <FaBug size={45} />
          </div>
          <Heading>Bug Tracker Login</Heading>
        </Flex>

        {/* FORM  */}
        <Box minW={{ base: '90%', md: '458px' }}>
          <form>
            <Stack spacing={4} p='1rem'>
              {/* EMAIL */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <CFaUserAlt color='gray.300' />
                  </InputLeftElement>
                  <Input type='email' placeholder='Email Address' />
                </InputGroup>
              </FormControl>
              {/* PASSWORD */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents='none' color='gray.300'>
                    <CFaLock color='gray.300' />
                  </InputLeftElement>
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
                {/* SUBMIT LOGIN */}
                <Button
                  borderRadius={0}
                  type='submit'
                  variant='solid'
                  colorScheme='blue'
                  width='full'
                  marginTop={5}
                  marginBottom={5}
                >
                  Login
                </Button>
                {/* BOTTOM  LINKS */}
                <FormHelperText textAlign='center'>
                  {helperTexts.map((helperText) => {
                    return (
                      <Flex
                        justifyContent='center'
                        alignItems='center'
                        key={helperText.url}
                        padding='.5rem'
                      >
                        <Text marginRight={1} fontSize='md'>
                          {helperText.text}
                        </Text>
                        <Text as='u' fontSize='md'>
                          <Link href={helperText.url}>
                            {helperText.hyperText}
                          </Link>
                        </Text>
                      </Flex>
                    );
                  })}
                </FormHelperText>
              </FormControl>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Home;
