import React from "react";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { CodepenIcon } from "lucide-react";
import { isEmpty } from "lodash";

interface TableData {
  [key: string]: string[];
}

function createData(headers: string[], data: TableData) {
  const rows: TableData[] = [];
  for (let i = 0; i < data[headers[0]].length; i++) {
    const row: TableData = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = [data[headers[j]][i]];
    }
    rows.push(row);
  }
  return rows;
}

type DataTableProps = {
  data: any;
  title: string;
};

export default function DataTable({ data, title }: DataTableProps) {
  const headers = Object.keys(data);
  const rows = createData(headers, data);

  return (
    <Box
      className='flex flex-col gap-8 bg-white px-8 py-6 rounded-3xl'
      borderWidth='1px'
      borderColor='gray.200'
      boxShadow='lg'
      mt={4}
    >
      {/* ========== TITLE SECTION */}
      {!isEmpty(title) && (
        <Grid templateColumns='repeat(6, 1fr)' gap={4}>
          <GridItem colSpan={1}>
            <Box
              className='bg-primary-6 w-16 h-16 rounded-2xl grid place-items-center col-span-1'
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <CodepenIcon className='text-primary-2' size={28} />
            </Box>
          </GridItem>
          <GridItem colSpan={5}>
            <p className='max-w-[40rem] col-span-7 text-lg font-bold'>
              {title}
            </p>
          </GridItem>
        </Grid>
      )}

      {/* ========== TABLE SECTION */}
      <Table size='md' variant='simple'>
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th key={header} className='capitalize text-gray-400 font-bold'>
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, index) => (
            <Tr key={index}>
              {headers.map((header, indexh) => (
                <Td key={header} textAlign='left'>
                  {row[header][0]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
