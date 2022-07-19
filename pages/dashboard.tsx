import type { NextPage } from 'next';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import NavBar from '../components/Navbar';
import DashHeader from '../components/DashHeader';
import TicketsByPriority from '../components/TicketsByPriority';
import TicketsByType from '../components/TicketsByType';

const Dashboard: NextPage = () => {
  return (
    <Flex h='100vh' flexDir='row' overflow='hidden' maxW='2000px'>
      {/* Dashboard/Navbar */}
      <Flex
        w='15%'
        flexDir='column'
        alignItems='center'
        boxShadow='2px 0 5px -2px #888'
      >
        <NavBar />
      </Flex>

      {/* Components */}
      <Flex backgroundColor='blackAlpha.200' w='full' flexDirection='column'>
        {/* DashHeader Component */}
        <DashHeader />
        {/* Components */}
        <Grid h='full' templateColumns='repeat(2, 1fr)'>
          {/* Tickets by priority */}
          <GridItem>
            <Flex justifyContent='center' alignItems='center' h='full'>
              <Box h='80%' w='80%'>
                <TicketsByPriority />
              </Box>
            </Flex>
          </GridItem>
          {/*  */}
          <GridItem>
            <Flex justifyContent='center' alignItems='center' h='full'>
              <Box h='80%' w='80%'>
                <TicketsByType />
              </Box>
            </Flex>
          </GridItem>
          {/*  */}
          <GridItem>
            <Flex justifyContent='center' alignItems='center' h='full'>
              <Box h='80%' w='80%'>
                <TicketsByPriority />
              </Box>
            </Flex>
          </GridItem>
          {/*  */}
          <GridItem>
            <Flex justifyContent='center' alignItems='center' h='full'>
              <Box h='80%' w='80%'>
                <TicketsByPriority />
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
