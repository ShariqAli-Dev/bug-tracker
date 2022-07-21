import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import Link from 'next/link';

const PageNotFound: NextPage = () => {
  return (
    <>
      <Box
        h='100vh'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Heading>404: Not Found</Heading>
        <Text fontSize='xl' my={5} textAlign='center'>
          You just hit a route that doesn&#39;t exist...the sadness.
        </Text>
        <Link href='/'>
          <Button>Go Back</Button>
        </Link>
      </Box>
    </>
  );
};

export default PageNotFound;
