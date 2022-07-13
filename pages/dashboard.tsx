import type { NextPage } from 'next';
import { Flex } from '@chakra-ui/react';
import NavBar from '../components/Navbar';
import DashHeader from '../components/DashHeader';

const Dashboard: NextPage = () => {
  return (
    <Flex h='100vh' flexDir='row' overflow='hidden' maxW='2000px'>
      {/* Dashboard/Navbar */}
      <Flex w='15%' flexDir='column' alignItems='center'>
        <NavBar />
      </Flex>

      {/* Components */}
      <Flex backgroundColor='grey' w='full'>
        {/* DashHeader Component */}
        <DashHeader />
        {/* Components */}
      </Flex>
    </Flex>
  );
};

export default Dashboard;
