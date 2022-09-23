import {
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
import Link from "next/link";
import { useMemo, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { usePagination, useTable } from "react-table";
const ArrowRight = chakra(AiOutlineArrowRight);
const ArrowLeft = chakra(AiOutlineArrowLeft);
const ChevronRight = chakra(BsChevronDoubleRight);
const ChevronLeft = chakra(BsChevronDoubleLeft);

const ProjectTickets = (props: any) => {
  const [data, setData] = useState([{}, {}]);
  const columns = useMemo(
    () => [
      {
        Header: "Tickets",
        columns: [
          {
            Header: "Title",
            accessor: "user.name",
          },
          {
            Header: "Description",
            accessor: "user.email",
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
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

  return (
    <>
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
                  .filter((header) => header.Header !== "Tickets")
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
                          <Link href={`/project/${parseInt(row.id) + 1}`}>
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
    </>
  );
};

export default ProjectTickets;
