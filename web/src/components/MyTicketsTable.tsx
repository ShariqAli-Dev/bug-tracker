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
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useMemo } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { MdRowing } from "react-icons/md";
import { usePagination, useTable } from "react-table";
import { useUserTicketsQuery, UserTicket } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
const ArrowRight = chakra(AiOutlineArrowRight);
const ArrowLeft = chakra(AiOutlineArrowLeft);
const ChevronRight = chakra(BsChevronDoubleRight);
const ChevronLeft = chakra(BsChevronDoubleLeft);

interface MyTicketsTableProps {
  tickets: UserTicket[];
}

const MyTicketsTable = (props: MyTicketsTableProps) => {
  const [{ data, fetching }] = useUserTicketsQuery();
  const columns = useMemo(
    () => [
      {
        Header: "My Tickets",
        columns: [
          {
            Header: "Project",
            accessor: "name",
          },
          {
            Header: "Ticket",
            accessor: "title",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Priority",
            accessor: "priority",
          },
          {
            Header: "",
            accessor: "view ticket",
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
      data: props.tickets,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );
  if (fetching) {
    return <></>;
  }
  return (
    <>
      <TableContainer
        marginTop={"5rem"}
        width={{ md: "80%" }}
        marginRight="auto"
        marginLeft="auto"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          backgroundColor="primary"
          color="tertiary"
          w="full"
        >
          <Box margin="6px">
            <Text>Your Tickets</Text>
            <Text display={{ base: "none", md: "block" }}>
              All the tickets you have in the database
            </Text>
          </Box>
        </Flex>
        <Table
          {...getTableBodyProps()}
          size={{ base: "sm", sm: "md" }}
          border="2px"
          borderColor="primary"
        >
          <Thead border="2px" borderColor="primary">
            {headerGroups.map((headerGroup, hdx) => (
              <Tr
                {...headerGroup.getHeaderGroupProps()}
                key={`headerGroup${hdx}`}
              >
                {headerGroup.headers
                  .filter((header) => header.Header !== "My Tickets")
                  .map((column, cdx) => {
                    return (
                      <Th
                        {...column.getHeaderProps()}
                        key={cdx}
                        border="2px"
                        borderColor="primary"
                      >
                        {column.render("Header")}
                      </Th>
                    );
                  })}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, rdx) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={rdx}>
                  {row.cells.map((cell) => {
                    const definiteData = data?.userTickets as any;
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
                              definiteData[parseInt(row.id)].projectId as any
                            )}`}
                          >
                            <Text
                              textDecoration="underline"
                              cursor="pointer"
                              textAlign="center"
                            >
                              View Ticket
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
      <Flex justifyContent="center" alignItems="center" marginTop="4rem">
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
    </>
  );
};

export default withUrqlClient(createUrqlClient)(MyTicketsTable);
