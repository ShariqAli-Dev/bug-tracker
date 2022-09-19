import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { withUrqlClient } from "next-urql";
import { useMemo, useState } from "react";

import { usePagination, useTable } from "react-table";
import { createUrqlClient } from "../utils/createUrqlClient";

const Hypothesis = () => {
  const [tableData, setTableData] = useState([{}]);

  const columns = useMemo(
    () => [
      {
        Header: "Assigned personnel",
        columns: [
          {
            Header: "User Name",
            accessor: "project.name",
          },
          {
            Header: "Email",
            accessor: "project.description",
          },
          {
            Header: "Role",
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

  console.log({ page }, "hypothesis");

  return (
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
                .filter((header) => header.Header !== "Assigned personnel")
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
  );
};

export default withUrqlClient(createUrqlClient)(Hypothesis);
