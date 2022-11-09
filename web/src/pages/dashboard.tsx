import { Box, Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import BurgerMenu from "../components/BurgerMenu";
import MyProjectsTable from "../components/MyProjectsTable";
import NavBar from "../components/Navbar";
import TicketsByPriority from "../components/TicketsByPriority";
import TicketsByStatus from "../components/TicketsByStatus";
import TicketsByType from "../components/TicketsByType";

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
        <NavBar pageProps={{}} />
      </Flex>

      {/* Components */}
      <Flex w="full" flexDirection="column" overflowY="auto">
        <Flex w="full">
          <Box margin="auto">
            <BurgerMenu />
          </Box>
          <Text
            width={{ base: "95%", sm: "100%" }}
            align="center"
            fontSize="3xl"
          >
            Dashboard
          </Text>
        </Flex>
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
