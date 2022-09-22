import {
  Box,
  Flex,
  Heading,
  Text,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  chakra,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { ReactNode } from "react";
import DashHeader from "../../components/DashHeader";
import NavBar from "../../components/Navbar";
import {
  useAssignedPersonnelQuery,
  useProjectQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { usePagination, useTable } from "react-table";
import { useMemo } from "react";
import { nanoid } from "nanoid";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
const ArrowRight = chakra(AiOutlineArrowRight);
const ArrowLeft = chakra(AiOutlineArrowLeft);
const ChevronRight = chakra(BsChevronDoubleRight);
const ChevronLeft = chakra(BsChevronDoubleLeft);

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
  const [{ data: projectQuery }] = useProjectQuery({
    variables: { projectId },
  });
  const [{ data: assignedPersonnelQuery }] = useAssignedPersonnelQuery({
    variables: { projectId },
  });
  const columns = useMemo(
    () => [
      {
        Header: "Assigned personnel",
        columns: [
          {
            Header: "User Name",
            accessor: "user.name",
          },
          {
            Header: "Email",
            accessor: "user.email",
          },
          {
            Header: "Role",
            accessor: "user.role",
          },
        ],
      },
    ],
    []
  );

  const {
    // getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    // pageOptions,`
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: assignedPersonnelQuery?.assignedPersonnel as any,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

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
            <SectionHeader
              title={`Details for Project #${projectQuery?.project?.id}`}
            >
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
                <Text marginLeft={5}>{projectQuery?.project?.name}</Text>
              </Box>
              <Box width="50%">
                <label>Project Description</label>
                <Text marginLeft={5}>{projectQuery?.project?.description}</Text>
              </Box>
            </Flex>
          </Box>
          {/* Bottom Duplex */}
          <Flex justifyContent="space-around">
            <Box width="50%">
              <SectionHeader title="Assigned Personnel">
                <Text>Current users on this project</Text>
              </SectionHeader>
              <TableContainer whiteSpace="normal" style={{ width: "90%" }}>
                <Table
                  {...getTableBodyProps()}
                  size={{ base: "sm", lg: "md" }}
                  border="2px"
                  borderColor="primary"
                >
                  <Thead border="2px" borderColor="primary">
                    {headerGroups.map((headerGroup) => (
                      <Tr {...headerGroup.getHeaderGroupProps()} key={nanoid()}>
                        {headerGroup.headers
                          .filter(
                            (header) => header.Header !== "Assigned personnel"
                          )
                          .map((column) => (
                            <Th
                              {...column.getHeaderProps()}
                              key={nanoid()}
                              border="2px"
                              borderColor="primary"
                            >
                              {column.render("Header")}
                            </Th>
                          ))}
                      </Tr>
                    ))}
                  </Thead>
                  <Tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                      prepareRow(row);
                      return (
                        <Tr {...row.getRowProps()} key={nanoid()}>
                          {row.cells.map((cell) => {
                            return (
                              <Td
                                {...cell.getCellProps()}
                                key={nanoid()}
                                border="2px"
                                borderColor="primary"
                              >
                                {cell.render("Cell")}
                              </Td>
                            );
                          })}
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
              <Flex justifyContent="center" alignItems="center">
                {/* Chevron Left */}
                <Tooltip label="First Page">
                  <IconButton
                    color="primary"
                    aria-label="Chevron Left"
                    onClick={() => gotoPage(0)}
                    isDisabled={!canPreviousPage}
                    icon={<ChevronLeft size="20px" />}
                  />
                </Tooltip>
                {/* Arrow Left */}
                <Tooltip label="Previous Page">
                  <IconButton
                    color="primary"
                    aria-label="Arrow Left"
                    onClick={previousPage}
                    isDisabled={!canPreviousPage}
                    icon={<ArrowLeft size="20px" />}
                  />
                </Tooltip>

                {/* Page Tracker */}
                <Text
                  fontWeight="bold"
                  color="tertiary"
                  backgroundColor="primary"
                  border="2px"
                  borderRadius="20px"
                  padding=".5rem"
                  margin="1rem"
                  width="45px"
                  textAlign="center"
                >
                  {pageIndex + 1}
                </Text>

                {/* Chevron Right */}
                <Tooltip label="Next Page">
                  <IconButton
                    color="primary"
                    aria-label="Arrow Right"
                    onClick={nextPage}
                    isDisabled={!canNextPage}
                    icon={<ArrowRight size="20px" />}
                  />
                </Tooltip>
                {/* Arrow Right */}
                <Tooltip label="Last Page">
                  <IconButton
                    color="primary"
                    aria-label="Chevron Right"
                    onClick={() => gotoPage(pageCount - 1)}
                    isDisabled={!canNextPage}
                    icon={<ChevronRight size="20px" />}
                  />
                </Tooltip>
              </Flex>
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
