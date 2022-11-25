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
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useRef, useState } from "react";
import AssignedPersonnel from "../../components/AssignedPersonnel";
import BurgerMenu from "../../components/BurgerMenu";
import DeleteProjectAlert from "../../components/DeleteProjectAlert";
import NavBar from "../../components/Navbar";
import ProjectModal from "../../components/ProjectModal";
import ProjectTickets from "../../components/ProjectTickets";
import TicketDetail from "../../components/TicketDetail";
import {
  useArchivedProjectTicketsQuery,
  useArchiveProjectMutation,
  useAssignedPersonnelQuery,
  useMeQuery,
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
  const [disabled, setDisabled] = useState(false);
  const [{ data: projectQuery }] = useProjectQuery({
    variables: { projectId },
  });
  const [{ data: personnelQuery, fetching: personnelFetch }] =
    useAssignedPersonnelQuery({ variables: { projectId } });
  const [{ data: ticketsQuery, fetching: ticketsFetch }] =
    useProjectTicketsQuery({ variables: { projectId } });
  const [{ data: archivedTickets, fetching: archivedTicketsFetch }] =
    useArchivedProjectTicketsQuery({ variables: { projectId } });
  const [, archiveProject] = useArchiveProjectMutation();
  const [ticketId, setTicketId] = useState<undefined | number>(undefined);
  const [{ data: me, fetching: meFetch }] = useMeQuery();
  const [viewArchived, setViewArchived] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: editProjectIsOpen,
    onOpen: editProjectOnOpen,
    onClose: editProjectOnClose,
  } = useDisclosure();
  const router = useRouter();
  const cancelRef = useRef();
  const initialRef = useRef();
  const finalRef = useRef();

  return (
    <>
      <Head>
        <title>Bug Tracker - ${projectQuery?.project?.name}</title>
        <meta
          name="Project Details"
          content="Shows details and tickets for corresponding project"
        />
      </Head>
      <Flex h="100vh" overflow="hidden" scrollBehavior="auto" color="primary">
        {/* Sidebar Nav */}
        <Flex
          w="15%"
          flexDir="column"
          alignItems="center"
          boxShadow="2px 0 5px -2px"
          display={{ base: "none", md: "flex" }}
        >
          <NavBar pageProps={{}} />
        </Flex>

        {/* Inner Section */}
        <Flex w="full" flexDir="column" overflowY="auto">
          {/* Contents */}
          <BurgerMenu pageProps={{}} />
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

              {!meFetch &&
              (me?.me?.role === "admin" ||
                me?.me?.role === "project manager") ? (
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
                    disabled={disabled}
                    onClick={async () => {
                      setDisabled(true);
                      await archiveProject({ archiveProjectId: projectId });
                      router.push("/dashboard");
                    }}
                  >
                    {projectQuery?.project?.archived ? "Unarchive" : "Archive"}{" "}
                    Project
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
                    onClick={editProjectOnOpen}
                  >
                    Edit Project
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
              ) : (
                <></>
              )}
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
                  pageProps={{}}
                  assignedPersonnel={
                    personnelQuery?.assignedPersonnel as AssignedPersonnelType[]
                  }
                  projectId={projectId}
                />
              )}

              {!ticketsFetch && !archivedTicketsFetch && (
                <ProjectTickets
                  pageProps={{}}
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
          pageProps={{}}
        />
      )}
      <ProjectModal
        isEditing={true}
        project={projectQuery?.project}
        pageProps={{}}
        isOpen={editProjectIsOpen}
        onClose={editProjectOnClose}
        finalRef={finalRef}
        initialRef={initialRef}
      />
    </>
  );
};

ProjectDetails.getInitialProps = ({ query }: any) => {
  return { projectId: parseInt(query.projectId) };
};

export default withUrqlClient(createUrqlClient)(ProjectDetails);
