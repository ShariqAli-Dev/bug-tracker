import {
  Box,
  Button,
  chakra,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
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
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { nanoid } from "nanoid";
import { withUrqlClient } from "next-urql";
import { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { usePagination, useTable } from "react-table";
import {
  useCreateProjectMutation,
  useUserProjectsQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { InputField } from "./InputField";
const ArrowRight = chakra(AiOutlineArrowRight);
const ArrowLeft = chakra(AiOutlineArrowLeft);
const ChevronRight = chakra(BsChevronDoubleRight);
const ChevronLeft = chakra(BsChevronDoubleLeft);

const MyProjectsTable = () => {
  const [tableData, setTableData] = useState([]);
  const toast = useToast();
  const [{ data, fetching }] = useUserProjectsQuery();
  const initialRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const [team, setTeam] = useState([
    { name: "shariq", selected: false },
    { name: "john", selected: false },
  ]);
  const [, createProject] = useCreateProjectMutation();
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
    if (!fetching) {
      setTableData(data?.UserProjects as any);
    } else {
      return;
    }
  }, [data, fetching]);

  return (
    <>
      {!fetching && (
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
                  Alll the projects you have in the database
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
                            <div>Details</div>
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
      )}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size={{ base: "xs", sm: "sm", md: "lg" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={8}>
            <Formik
              initialValues={{
                name: "",
                description: "",
              }}
              onSubmit={async (options) => {
                try {
                  const { data } = await createProject({ options });
                  console.log(data?.createProject);
                  if (!toast.isActive("newProjectSuccess")) {
                    toast({
                      id: "newProjectSuccess",
                      title: "Project Sucess",
                      description: "We succesfully created the project",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                      variant: "subtle",
                      containerStyle: {
                        color: "primary",
                      },
                      position: "top",
                    });
                  }
                } catch {
                  if (!toast.isActive("newProjectError")) {
                    toast({
                      id: "newProjectError",
                      title: "Project Error",
                      description:
                        "Unfortunately, we  could not create the project",
                      status: "error",
                      duration: 3000,
                      isClosable: true,
                      variant: "subtle",
                      containerStyle: {
                        color: "primary",
                      },
                      position: "top",
                    });
                  }
                }
              }}
            >
              {({ values, handleChange, isSubmitting }) => (
                <Form>
                  {/* Project Name */}
                  <Box pb={2}>
                    <InputField
                      onChange={handleChange}
                      value={values.name}
                      name="name"
                      label="name"
                      required
                    />
                  </Box>
                  {/* Project Description */}
                  <Box pb={2}>
                    <InputField
                      onChange={handleChange}
                      value={values.description}
                      name="description"
                      label="description"
                      textarea
                      required
                    />
                  </Box>
                  {/* Add Team Members */}
                  <Box
                    overflowY="auto"
                    height="150px"
                    scrollBehavior="auto"
                    p={4}
                    borderColor="light-blue"
                    borderWidth={0.1}
                    borderRadius={"xl"}
                  >
                    {team.map((p, pdx) => {
                      return (
                        <Text
                          fontSize={"1rem"}
                          onClick={() => {
                            team[pdx].selected = !team[pdx].selected;
                            setTeam([...team]);
                          }}
                          backgroundColor={p.selected ? "primary" : "white"}
                          color={p.selected ? "tertiary" : "secondary"}
                          key={p.name}
                        >
                          {p.name}
                        </Text>
                      );
                    })}
                  </Box>
                  <Box
                    width="full"
                    display="flex"
                    justifyContent="space-around"
                  >
                    <Button type="submit" isLoading={isSubmitting}>
                      Send notification
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  MyProjectsTable
);
