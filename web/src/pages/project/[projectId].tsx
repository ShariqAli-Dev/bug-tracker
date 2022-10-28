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
import { ReactNode, useRef, useState } from "react";
import AssignedPersonnel from "../../components/AssignedPersonnel";
import DashHeader from "../../components/DashHeader";
import DeleteProjectAlert from "../../components/DeleteProjectAlert";
import NavBar from "../../components/Navbar";
import ProjectTickets from "../../components/ProjectTickets";
import TicketDetail from "../../components/TicketDetail";
import {
  useArchivedProjectTicketsQuery,
  useAssignedPersonnelQuery,
  useProjectQuery,
  useProjectTicketsQuery,
} from "../../generated/graphql";
import { AssignedPersonnel as AssignedPersonnelType } from "../../types";
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
    useAssignedPersonnelQuery({ variables: { projectId } });
  const [{ data: ticketsQuery, fetching: ticketsFetch }] =
    useProjectTicketsQuery({ variables: { projectId } });
  const [{ data: archivedTickets, fetching: archivedTicketsFetch }] =
    useArchivedProjectTicketsQuery({ variables: { projectId } });
  const [ticketId, setTicketId] = useState<undefined | number>(undefined);
  const [viewArchived, setViewArchived] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      <Flex h="100vh" overflow="hidden" scrollBehavior="auto" color="primary">
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
        <Flex w="full" flexDir="column" overflowY="auto">
          {/* Dash Header */}
          <DashHeader pageProps={{}} />
          {/* Contents */}
          <Box
            backgroundColor="white"
            marginTop={8}
            marginBottom={8}
            marginLeft={4}
            marginRight={4}
            height="80%"
          >
            <SectionHeader title={`Project: ${projectQuery?.project?.name}`}>
              <Text>{projectQuery?.project?.description}</Text>

              <Flex
                width="full"
                justifyContent={{ base: "space-around", md: "start" }}
              >
                <Button
                  size="xs"
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
                  Archive Project
                </Button>
                <Button
                  size="xs"
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
                  onClick={onOpen}
                >
                  Delete Project
                </Button>
              </Flex>
            </SectionHeader>

            {/* Duplex */}
            <Flex
              justifyContent="space-around"
              flexDirection={{ base: "column", md: "row" }}
              height="50%"
              marginTop={{ base: "15rem", md: "1rem" }}
            >
              {!personnelFetch && (
                <AssignedPersonnel
                  assignedPersonnel={
                    personnelQuery?.assignedPersonnel as AssignedPersonnelType[]
                  }
                  projectId={projectId}
                />
              )}

              {!ticketsFetch && !archivedTicketsFetch && (
                <ProjectTickets
                  projectTickets={
                    viewArchived
                      ? archivedTickets?.archivedProjectTickets
                      : ticketsQuery?.projectTickets
                  }
                  projectId={projectId}
                  setTicketId={setTicketId}
                  viewArchived={viewArchived}
                  setViewArchived={setViewArchived}
                />
              )}
            </Flex>
            {ticketId && <TicketDetail ticketId={ticketId} />}
          </Box>
        </Flex>
      </Flex>
      {!archivedTicketsFetch && (
        <DeleteProjectAlert
          cancelRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
          projectId={projectId}
        />
      )}
    </>
  );
};

ProjectDetails.getInitialProps = ({ query }: any) => {
  return { projectId: parseInt(query.projectId) };
};

export default withUrqlClient(createUrqlClient)(ProjectDetails);
