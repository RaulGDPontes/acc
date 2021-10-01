import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

interface IData {
  columnName: string;
  propName: string;
}

export default function TableComp() {
  const [rows, setRows] = useState<any[]>([]);
  const fields: IData[] = [
    {
      columnName: 'Name',
      propName: 'name'
    },
    {
      columnName: 'Region',
      propName: 'region'
    },
    {
      columnName: 'Administrative region',
      propName: 'adminregion'
    },
    {
      columnName: 'Income level',
      propName: 'incomeLevel'
    },
    {
      columnName: 'Lending type',
      propName: 'lendingType'
    },
    {
      columnName: 'Capital',
      propName: 'capitalCity'
    },
    {
      columnName: 'Longitude',
      propName: 'longitude'
    },
    {
      columnName: 'Latitude',
      propName: 'latitude'
    }
  ];

  useEffect((): any => {
      axios.get('http://api.worldbank.org/v2/country/br?format=json').then(result => {
        setRows(result.data[1]);
      })
  }, [])

  const getData = (data: any) => {
    return typeof (data) == 'string' ? data : data.value;
  }

  return (
    <Paper style={{width: '1150px'}}>
      <TableContainer >
        <Table sx={{ minWidth: 650, width: '1130px' }} >
          <TableHead>
            <TableRow>
              {fields.map(f =>
                <TableCell key={f.columnName}>{f.columnName}</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow
                key={rows.indexOf(row)}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {fields.map(f =>
                  <TableCell
                    key={f.propName}
                    component='th' scope='row'>
                    {getData(row[f.propName])}
                  </TableCell>
                )}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
