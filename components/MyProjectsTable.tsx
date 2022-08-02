import { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  Text,
  Tooltip,
  TableContainer,
  chakra,
  Box,
  Button,
} from '@chakra-ui/react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import { Project } from '../types';
import { nanoid } from 'nanoid';
import { userProjects } from '../utils/dummyData';

const ArrowRight = chakra(AiOutlineArrowRight);
const ArrowLeft = chakra(AiOutlineArrowLeft);
const ChevronRight = chakra(BsChevronDoubleRight);
const ChevronLeft = chakra(BsChevronDoubleLeft);

const MyProjectsTable = () => {
  const [data, setData] = useState<Project[] | []>([]);
  const columns = useMemo(
    () => [
      {
        Header: 'My Projects',
        columns: [
          {
            Header: 'Project',
            accessor: 'project',
          },
          {
            Header: 'Description',
            accessor: 'description',
          },
          {
            Header: 'Contributors',
            accessor: 'contributors',
          },
        ],
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

  useEffect(() => {
    setData(userProjects);
  }, []);

  return (
    <>
      <TableContainer whiteSpace='normal'>
        <Flex
          justifyContent='space-between'
          alignItems='center'
          backgroundColor='primary'
          color='tertiary'
          w='full'
        >
          <Box margin='6px'>
            <Text>Your Projects</Text>
            <Text display={{ base: 'none', md: 'block' }}>
              Alll the projects you have in the database
            </Text>
          </Box>
          <Button
            marginRight='6px'
            color='primary'
            backgroundColor='tertiary'
            border='1px'
            borderColor='primary'
          >
            Create New Project
          </Button>
        </Flex>

        <Table
          {...getTableBodyProps()}
          size={{ base: 'sm', lg: 'md' }}
          border='2px'
          borderColor='primary'
        >
          <Thead border='2px' borderColor='primary'>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={nanoid()}>
                {headerGroup.headers
                  .filter((header) => header.Header !== 'My Projects')
                  .map((column) => (
                    <Th
                      {...column.getHeaderProps()}
                      key={nanoid()}
                      border='2px'
                      borderColor='primary'
                    >
                      {column.render('Header')}
                    </Th>
                  ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={nanoid()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={nanoid()}
                        border='2px'
                        borderColor='primary'
                      >
                        {cell.render('Cell')}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex justifyContent='center' alignItems='center'>
        {/* Chevron Left */}
        <Tooltip label='First Page'>
          <IconButton
            color='primary'
            aria-label='Chevron Left'
            onClick={() => gotoPage(0)}
            isDisabled={!canPreviousPage}
            icon={<ChevronLeft size='20px' />}
          />
        </Tooltip>
        {/* Arrow Left */}
        <Tooltip label='Previous Page'>
          <IconButton
            color='primary'
            aria-label='Arrow Left'
            onClick={previousPage}
            isDisabled={!canPreviousPage}
            icon={<ArrowLeft size='20px' />}
          />
        </Tooltip>

        {/* Page Tracker */}
        <Text
          fontWeight='bold'
          color='tertiary'
          backgroundColor='primary'
          border='2px'
          borderRadius='20px'
          padding='.5rem'
          margin='1rem'
          width='45px'
          textAlign='center'
        >
          {pageIndex + 1}
        </Text>

        {/* Chevron Right */}
        <Tooltip label='Next Page'>
          <IconButton
            color='primary'
            aria-label='Arrow Right'
            onClick={nextPage}
            isDisabled={!canNextPage}
            icon={<ArrowRight size='20px' />}
          />
        </Tooltip>
        {/* Arrow Right */}
        <Tooltip label='Last Page'>
          <IconButton
            color='primary'
            aria-label='Chevron Right'
            onClick={() => gotoPage(pageCount - 1)}
            isDisabled={!canNextPage}
            icon={<ChevronRight size='20px' />}
          />
        </Tooltip>
      </Flex>
    </>
  );
};

export default MyProjectsTable;
