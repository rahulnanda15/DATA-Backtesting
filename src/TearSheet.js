import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const excessReturns = {
  2018: '30%',
  2019: '20%',
  2020: '15%',
  2021: '25%',
  2022: '10%',
};

const years = [2018, 2019, 2020, 2021, 2022];
const annualReturns1 = [10, 15, 8, 12, 14];
const annualReturns2 = [9, 16, 7, 13, 11];
const annualReturns3 = [8, 14, 6, 11, 13];





export default function TearSheet(props) {

  const data = [
    { category: 'DATA', cagr: String((parseFloat(props.dataCAGR)).toFixed(2))+"%", totalReturn: String(parseFloat(props.dataReturn).toFixed(2))+"%" },
    { category: 'SPY', cagr: String((parseFloat(props.spyCAGR)).toFixed(2))+"%", totalReturn: String(parseFloat(props.spyReturn).toFixed(2))+"%" },
    { category: 'SPXEW', cagr: String((parseFloat(props.spyeqCAGR)).toFixed(2))+"%", totalReturn: String(parseFloat(props.spyEqReturn).toFixed(2))+"%" },
  ];

  return (
    <div>
      <Box sx= {{ flexGrow: 1, display: 'flex'}}>
          <Grid container spacing={3}>
              
              <Grid item xs={4}>
              <TableContainer component={Paper} sx={{ maxWidth: 400, margin: 'auto', height: '400px' }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={2}><b>Excess Returns</b></TableCell>
                    </TableRow>
                    <TableRow sx={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white' }}>
                      <TableCell align="center"><b>Year</b></TableCell>
                      <TableCell align="center"><b>DATA/SPY</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(props.excessReturn).map(([year, returnPercentage]) => (
                      <TableRow key={year}>
                        <TableCell align="center">{year}</TableCell>
                        <TableCell align="center">{(returnPercentage).toFixed(2)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </Grid>
              <Grid item xs={8}>
                <TableContainer component={Paper} sx={{ maxWidth: 600, margin: 'auto', height: '400px' }}>
                  <Table aria-label="annual returns table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" colSpan={4}><b>Annual Returns</b></TableCell>
                      </TableRow>
                      <TableRow sx={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white' }}>
                        <TableCell align="center"><b>Year</b></TableCell>
                        <TableCell align="center"><b>DATA</b></TableCell>
                        <TableCell align="center"><b>SPY</b></TableCell>
                        <TableCell align="center"><b>SPXEW</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.years.map((year, index) => (
                        <TableRow key={year}>
                          <TableCell align="center">{props.years[index]}</TableCell>
                          <TableCell align="center">{(parseFloat(props.DATAAnnualReturns[index])).toFixed(2)}%</TableCell>
                          <TableCell align="center">{(parseFloat(props.SPYAnnualReturns[index])).toFixed(2)}%</TableCell>
                          <TableCell align="center">{(parseFloat(props.SPYEqAnnualReturns[index])).toFixed(2)}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          
          
      </Box>
      <Box sx= {{ flexGrow: 1, display: 'flex', mt: 3}}>
          <Grid container spacing={3}>
              
              <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
                  <Table aria-label="category table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"><b>CAGR</b></TableCell>
                        <TableCell align="center"><b>Total Return</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((row) => (
                        <TableRow key={row.category}>
                          <TableCell align="center">{row.category}</TableCell>
                          <TableCell align="center">{row.cagr}</TableCell>
                          <TableCell align="center">{row.totalReturn}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
          </Grid>
        </Box>
      
   </div>
  );
}
