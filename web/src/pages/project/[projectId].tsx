import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { ReactNode } from "react";
import AssignedPersonnel from "../../components/AssignedPersonnel";
import DashHeader from "../../components/DashHeader";
import NavBar from "../../components/Navbar";
import { useProjectQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

interface SectionHeaderProps {
  title: string;
  children: ReactNode;
}

const SectionHeader = ({ title, children }: SectionHeaderProps) => {
  return (
    <Box margin="auto" width="90%" backgroundColor="primary" color="tertiary">
      <Heading as="h4" size="lg">
        {title}
      </Heading>
      <Box>{children}</Box>
    </Box>
  );
};

const ProjectDetails: NextPage<{ projectId: number }> = ({ projectId }) => {
  const [{ data }] = useProjectQuery({
    variables: { projectId },
  });
  return (
    <Flex
      h="100vh"
      flexDir="row"
      overflow="hidden"
      scrollBehavior="auto"
      color="primary"
    >
      {/* Sidebar Nav */}
      <Flex
        w="15%"
        flexDir="column"
        alignItems="center"
        boxShadow="2px 0 5px -2px"
        display={{ base: "none", md: "flex" }}
      >
        <NavBar />
      </Flex>

      {/* Inner Section */}
      <Flex
        w="full"
        flexDir="column"
        overflowY="auto"
        backgroundColor="tertiary"
      >
        {/* Dash Header */}
        <DashHeader pageProps={{}} />
        {/* Contents */}
        <Box
          backgroundColor="white"
          marginTop={8}
          marginBottom={8}
          marginLeft={4}
          marginRight={4}
        >
          {/* Top Part */}
          <Box>
            <SectionHeader title={`Details for Project #${data?.project?.id}`}>
              <Link href="/dashboard">
                <a>Back to Dashboard</a>
              </Link>
              <span> | </span>
              <Link href="testing">
                <a>Edit</a>
              </Link>
            </SectionHeader>

            <Flex
              justifyContent="space-between"
              alignItems="center"
              width="80%"
              margin="auto"
            >
              <Box width="50%">
                <label>Project Name</label>
                <Text marginLeft={5}>{data?.project?.name}</Text>
              </Box>
              <Box width="50%">
                <label>Project Description</label>
                <Text marginLeft={5}>{data?.project?.description}</Text>
              </Box>
            </Flex>
          </Box>
          {/* Bottom Duplex */}
          <Flex justifyContent="space-around">
            <Box width="50%">
              <SectionHeader title="Assigned Personnel">
                <Text>Current users on this project</Text>
              </SectionHeader>
              <AssignedPersonnel pageProps={{}} />
            </Box>

            <Box width="50%">
              <SectionHeader title="Tickets for this Project">
                <Text>Condensed Ticket Details</Text>
              </SectionHeader>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

ProjectDetails.getInitialProps = ({ query }: any) => {
  return { projectId: parseInt(query.projectId) };
};

export default withUrqlClient(createUrqlClient)(ProjectDetails);
