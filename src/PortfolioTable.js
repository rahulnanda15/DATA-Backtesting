import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#3d0045",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

function transformData(data) {
  const years = Object.keys(data);
  const maxTickers = Math.max(...Object.values(data).map(tickers => tickers.length));

  const rows = Array.from({ length: maxTickers }).map((_, rowIndex) => {
    const row = {};
    years.forEach(year => {
      row[year] = data[year][rowIndex] || ''; // Fill empty slots with empty strings
    });
    return row;
  });

  return { years, rows };
}

function DenseTable(props) {
  const { years, rows } = transformData(props.data);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"></StyledTableCell> {/* Row number header */}
            {years.map((year) => (
              <StyledTableCell key={year} align="center">{year}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <TableCell align="center">{index + 1}</TableCell> {/* Row number cell */}
              {years.map((year) => (
                <TableCell key={year + index} align="center">
                  {row[year]}
                </TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DenseTable;
