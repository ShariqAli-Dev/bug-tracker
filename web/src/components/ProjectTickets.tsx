import {
  Box,
  Button,
  chakra,
  Flex,
  Heading,
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
import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { usePagination, useTable } from "react-table";
import { Ticket } from "../generated/graphql";
import { SectionHeader } from "../pages/project/[projectId]";
import EditTicketModal from "./EditTicketModal";
import TicketModal from "./TicketModal";
const ArrowRight = chakra(AiOutlineArrowRight);
const ArrowLeft = chakra(AiOutlineArrowLeft);
const ChevronRight = chakra(BsChevronDoubleRight);
const ChevronLeft = chakra(BsChevronDoubleLeft);

interface ProjectTicketsProps {
  projectTickets: any;
  projectId: number;
  setTicketId: Dispatch<SetStateAction<undefined | number>>;
}

const ProjectTickets = (props: ProjectTicketsProps) => {
  const {
    isOpen: newTicketIsOpen,
    onOpen: newTicketOnOpen,
    onClose: newTicketOnClose,
  } = useDisclosure();
  const {
    isOpen: editTicketIsOpen,
    onOpen: editTicketOnOpen,
    onClose: editTicketOnClose,
  } = useDisclosure();
  const [editTicketData, setEditTicketData] = useState<Ticket | undefined>(
    undefined
  );

  const finalRef = useRef(null);
  const initialRef = useRef(null);
  const columns = useMemo(
    () => [
      {
        Header: "Tickets",
        columns: [
          {
            Header: "Title",
            accessor: "title",
          },
          {
            Header: "Description",
            accessor: "description",
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
      data: props.projectTickets as any,
      initialState: { pageIndex: 0, pageSize: 3 },
    },
    usePagination
  );

  return (
    <>
      <Box
        width={{ base: "90%", sm: "45%" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="auto"
        ref={finalRef}
      >
        <SectionHeader>
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
              onClick={newTicketOnOpen}
            >
              New Ticket
            </Button>
          </Flex>
          <Text>A condensed view of the tickets</Text>
        </SectionHeader>
        <TableContainer whiteSpace="normal" style={{ width: "90%" }}>
          <Table
            {...getTableBodyProps()}
            size={{ lg: "md" }}
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
                            <Text
                              onClick={() => {
                                props.setTicketId(
                                  props.projectTickets[parseInt(row.id)].id
                                );
                              }}
                              cursor="pointer"
                              textAlign="center"
                            >
                              <span style={{ textDecoration: "underline" }}>
                                Details
                              </span>{" "}
                              |{" "}
                              <span
                                onClick={() => {
                                  setEditTicketData(
                                    props.projectTickets[parseInt(row.id)]
                                  );
                                  editTicketOnOpen();
                                }}
                                style={{ textDecoration: "underline" }}
                              >
                                Edit
                              </span>
                            </Text>
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
      </Box>
      <TicketModal
        pageProps={{}}
        isOpen={newTicketIsOpen}
        onClose={newTicketOnClose}
        finalRef={finalRef}
        initialRef={initialRef}
        projectId={props.projectId}
      />

      {editTicketData && (
        <EditTicketModal
          pageProps={{}}
          isOpen={editTicketIsOpen}
          onClose={editTicketOnClose}
          finalRef={finalRef}
          initialRef={initialRef}
          projectId={props.projectId}
          ticketData={editTicketData}
        />
      )}
    </>
  );
};

export default ProjectTickets;
