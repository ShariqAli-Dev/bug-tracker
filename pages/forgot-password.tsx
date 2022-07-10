import { NextPage } from 'next';
import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';

const CFaUserAlt = chakra(FaUserAlt);
const initalFormValues = { email: '' };

const ForgotPassword: NextPage = () => {
  const [formValues, setFormValues] = useState(initalFormValues);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormValues({ ...formValues, [e.target.name]: e.target.value });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

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
        p={{ base: '1rem', sm: '2rem', md: '3rem' }}
        rounded='xl'
      >
        <Heading>Forgot your password?</Heading>

        <Box minW={{ base: '80%', md: '458px' }}>
          <Text>
            Please enter the email address you&apos;d like your password reset
            information sent to
          </Text>
          <form onSubmit={onSubmit}>
            <Stack spacing={4} p='1rem'>
              <FormControl>
                <FormLabel>Enter Email Address</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <CFaUserAlt color='gray.500' />
                  </InputLeftElement>
                  <Input
                    boxShadow='md'
                    name='email'
                    id='email'
                    type='email'
                    borderColor='blue'
                    autoComplete='email'
                    onChange={onChange}
                    required
                  />
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type='submit'
                variant='solid'
                colorScheme='facebook'
                width='full'
                marginTop={5}
                marginBottom={5}
                rounded='xl'
              >
                Request Reset Link
              </Button>
              <FormControl>
                <FormHelperText>
                  <Flex
                    justifyContent='center'
                    alignItems='center'
                    padding='.5rem'
                  >
                    <Text color='blackAlpha.700' marginRight={1} fontSize='md'>
                      Take me back to
                    </Text>
                    <Text color='blackAlpha.700' as='u' fontSize='md'>
                      <Link href='/'>Sign In</Link>
                    </Text>
                  </Flex>
                </FormHelperText>
              </FormControl>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default ForgotPassword;
