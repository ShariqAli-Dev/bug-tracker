import { Box, Heading, Text } from '@chakra-ui/react';
import { NextPage } from 'next';

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
        <Text fontSize='xl' my={5}>
          You just hit a route that doesn&#39;t exist... the sadness.
        </Text>
      </Box>
    </>
  );
};

export default PageNotFound;
