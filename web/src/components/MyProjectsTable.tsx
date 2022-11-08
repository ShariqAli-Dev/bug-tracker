import {
  Box,
  Button,
  chakra,
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { usePagination, useTable } from "react-table";
import { useUserProjectsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import ProjectModal from "./ProjectModal";
const ArrowRight = chakra(AiOutlineArrowRight);
const ArrowLeft = chakra(AiOutlineArrowLeft);
const ChevronRight = chakra(BsChevronDoubleRight);
const ChevronLeft = chakra(BsChevronDoubleLeft);

const MyProjectsTable = () => {
  const [tableData, setTableData] = useState([]);
  const [{ data, fetching }] = useUserProjectsQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const initialRef = useRef(null);

  const columns = useMemo(
    () => [
      {
        Header: "My Projects",
        columns: [
          {
            Header: "Project",
            accessor: "project.name",
          },
          {
            Header: "Description",
            accessor: "project.description",
          },
          {
            Header: "",
            accessor: "details",
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
      data: tableData,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

  useEffect(() => {
    if (!fetching && data?.UserProjects) {
      setTableData(data?.UserProjects as any);
    } else {
      return;
    }
  }, [data, fetching]);

  if (fetching) {
    return <></>;
  }

  return (
    <>
      <TableContainer whiteSpace="normal" style={{ width: "90%" }}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          backgroundColor="primary"
          color="tertiary"
          w="full"
        >
          <Box margin="6px" ref={finalRef}>
            <Text>Your Projects</Text>
            <Text display={{ base: "none", md: "block" }}>
              All the projects you have in the database
            </Text>
          </Box>
          <Button
            marginRight="6px"
            color="primary"
            backgroundColor="tertiary"
            border="1px"
            borderColor="primary"
            onClick={onOpen}
          >
            Create New Project
          </Button>
        </Flex>

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
                  .filter((header) => header.Header !== "My Projects")
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
                        {!cell.column.Header && (
                          <Link
                            href={`/project/${parseInt(
                              data?.UserProjects[parseInt(row.id)]
                                .projectId as any
                            )}`}
                          >
                            <Text
                              textDecoration="underline"
                              cursor="pointer"
                              textAlign="center"
                            >
                              Details
                            </Text>
                          </Link>
                        )}
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
      <ProjectModal
        pageProps={{}}
        isOpen={isOpen}
        onClose={onClose}
        finalRef={finalRef}
        initialRef={initialRef}
      />
    </>
  );
};

export default withUrqlClient(createUrqlClient)(MyProjectsTable);
