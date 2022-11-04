import type { NextPage } from "next";
import { Box, Flex } from "@chakra-ui/react";
import NavBar from "../components/Navbar";
import DashHeader from "../components/DashHeader";
import MyProjectsTable from "../components/MyProjectsTable";
import TicketsByType from "../components/TicketsByType";
import TicketsByPriority from "../components/TicketsByPriority";
import TicketsByStatus from "../components/TicketsByStatus";

const Dashboard: NextPage = () => {
  return (
    <Flex
      h={{ base: "140vh", md: "100vh" }}
      flexDir="row"
      overflow="hidden"
      scrollBehavior="auto"
    >
      {/* Dashboard/Navbar */}
      <Flex
        w="15%"
        flexDir="column"
        alignItems="center"
        boxShadow="2px 0 5px -2px "
        display={{ base: "none", md: "flex" }}
      >
        <NavBar />
      </Flex>

      {/* Components */}
      <Flex w="full" flexDirection="column" overflowY="auto">
        {/* DashHeader Component */}
        <DashHeader pageProps={{}} />
        {/* Contents */} {/* <DaGrid/> */}
        <Flex
          flexDirection="column"
          justifyContent="space-evenly"
          alignItems="center"
          h="full"
        >
          <MyProjectsTable pageProps={{}} />
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            height="30%"
            justifyContent="space-around"
            width="full"
            alignItems="center"
          >
            <Box
              height={{ base: "full", md: "90%" }}
              width={{ base: "60%", md: "27%" }}
            >
              <TicketsByType pageProps={{}} />
            </Box>
            <Box
              height={{ base: "full", md: "90%" }}
              width={{ base: "60%", md: "27%" }}
            >
              <TicketsByPriority pageProps={{}} />
            </Box>

            <Box
              height={{ base: "full", md: "90%" }}
              width={{ base: "60%", md: "27%" }}
            >
              <TicketsByStatus pageProps={{}} />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
