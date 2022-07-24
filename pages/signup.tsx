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
import React, { useState } from 'react';
import { FaUserAlt, FaLock, FaBug } from 'react-icons/fa';
import { useRouter } from 'next/router';

const helperTexts = [
  { text: 'Have an account?', hyperText: 'Sign In', url: '/' },
  { text: 'Sign in as a', hyperText: 'Demo User', url: 'demo' },
];
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const initalFormValues = {
  email: '',
  password: '',
};

const Signup: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState(initalFormValues);
  const router = useRouter();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormValues({ ...formValues, [e.target.name]: e.target.value });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <Flex
      flexDirection='column'
      width='100wh'
      height='100vh'
      backgroundColor='primary'
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
        p={{ base: '1rem', sm: '2rem', md: '3rem' }}
        rounded='xl'
        width={{ base: '85%', md: '65%', lg: '45%', xl: '35%' }}
      >
        {/* HEADING */}
        <Flex color='primary' justifyContent='center' alignItems='center'>
          <FaBug style={{ margin: '1rem' }} size={45} />
          <Heading>Bug Tracker Registration</Heading>
        </Flex>

        {/* FORM  */}
        <Box minW={{ base: '90%', md: '458px' }}>
          <form onSubmit={onSubmit}>
            <Stack spacing={4} p='1rem'>
              {/* EMAIL */}
              <FormControl>
                <InputGroup color='#7A7A7A'>
                  <InputLeftElement pointerEvents='none'>
                    <CFaUserAlt />
                  </InputLeftElement>
                  <Input
                    type='email'
                    placeholder='Email Address'
                    id='email'
                    name='email'
                    onChange={onChange}
                    autoComplete='email'
                    required
                  />
                </InputGroup>
              </FormControl>
              {/* PASSWORD */}
              <FormControl color='#7A7A7A'>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <CFaLock />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    id='password'
                    name='password'
                    onChange={onChange}
                    autoComplete='current-password'
                    required
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
                  backgroundColor='primary'
                  width='full'
                  marginTop={5}
                  marginBottom={5}
                  rounded='xl'
                  color='tertiary'
                  _hover={{
                    backgroundColor: 'tertiary',
                    color: 'primary',
                    border: '2px',
                    borderColor: 'primary',
                  }}
                >
                  Sign Up
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
                        color='primary'
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

export default Signup;
