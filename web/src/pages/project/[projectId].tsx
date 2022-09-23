import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { ReactNode, useRef } from "react";
import AssignedPersonnel from "../../components/AssignedPersonnel";
import DashHeader from "../../components/DashHeader";
import NavBar from "../../components/Navbar";
import ProjectTickets from "../../components/ProjectTickets";
import {
  useAssignedPersonnelQuery,
  useProjectQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

interface SectionHeaderProps {
  title?: string;
  children: ReactNode;
}

export const SectionHeader = ({ title, children }: SectionHeaderProps) => {
  return (
    <Box margin="auto" width="90%" backgroundColor="primary" color="tertiary">
      {title ? (
        <>
          <Heading as="h4" size="lg">
            {title}
          </Heading>
          <Box>{children}</Box>
        </>
      ) : (
        <Box>{children}</Box>
      )}
    </Box>
  );
};

const ProjectDetails: NextPage<{ projectId: number }> = ({ projectId }) => {
  const [{ data: projectQuery }] = useProjectQuery({
    variables: { projectId },
  });

  const [{ data: personnelQuery, fetching: personnelFetch }] =
    useAssignedPersonnelQuery({
      variables: { projectId },
    });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const initialRef = useRef(null);

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
          // background="red"
          height="80%"
        >
          {/* Top Part */}
          <Box>
            <SectionHeader title={`Project: ${projectQuery?.project?.name}`}>
              <Text>{projectQuery?.project?.description}</Text>
              <Link href="/dashboard">
                <a>Back to Dashboard</a>
              </Link>
              <span> | </span>
              <Link href="testing">
                <a>Edit</a>
              </Link>
            </SectionHeader>
          </Box>
          {/* Bottom Duplex */}
          <Flex
            justifyContent="space-around"
            flexDirection={{ base: "column", md: "row" }}
            height="75%"
          >
            {!personnelFetch && (
              <AssignedPersonnel
                data={personnelQuery?.assignedPersonnel as any}
              />
            )}

            <Box
              width={{ base: "90%", sm: "45%" }}
              display="flex"
              flexDirection="column"
              alignItems="center"
              margin="auto"
            >
              <SectionHeader>
                <>
                  <Flex width="full" padding={2} justifyContent="space-between">
                    <Heading>Tickets</Heading>
                    <Button
                      size="sm"
                      color="tertiary"
                      backgroundColor="primary"
                      border="2px"
                      margin={2}
                      padding={1}
                      _hover={{
                        backgroundColor: "tertiary",
                        color: "primary",
                        border: "2px",
                        borderColor: "primary",
                      }}
                    >
                      New Ticket
                    </Button>
                  </Flex>
                  <Text>A condensed view of the tickets</Text>
                </>
              </SectionHeader>
              <ProjectTickets />
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
