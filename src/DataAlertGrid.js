import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import PortfolioHistoryTable from './TearSheet';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function DataAlertGrid(props) {

    const alertMessages = ["Item 1 warning", "Item 2 warning", "Item 3 warning"];

    return (
        <Box sx= {{ flexGrow: 1}}>
            
            <Grid container spacing={5}>
            
                <Grid item xs={5.75}>
                    <Item
                    sx={{
                        paddingTop: '30px',
                        paddingBottom: '83px', 
                        paddingLeft: '40px',
                        top: 120,
                        zIndex: 1000
                    }}
                    elevation={0}
                    >
                    <Typography variant="h4" gutterBottom 
                        sx={{
                            ml: 3,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'BlinkMacSystemFont',
                            fontWeight: 500,
                            letterSpacing: '0rem',
                            textDecoration: 'none'
                        }}>
                        Alerts
                    </Typography>
                    <Divider orientation="horizontal" variant='middle' flexItem 
                        sx={{ 
                            borderWidth: '0.5px', // Increase thickness
                            marginBottom: '30px',
                            borderColor: '#5d1975', // Set a visible color
                            width: '98%', // Ensure it takes full height
                            alignSelf: 'stretch' // Make sure it stretches across the height of the container
                        }} 
                    />
                    <Stack 
                        sx={{

                        }}
                        spacing = {2}
                    >
                        {props.alertMessages.map((message, index) => (
                            <Alert key={index} variant="outlined" severity="warning">
                            {message}
                            </Alert>
                        ))}
                    </Stack>
                    
                    
                    </Item>
                </Grid>
                <Grid item xs={0.25}><Divider orientation="vertical" variant='middle' flexItem 
                    sx={{ 
                    borderRightWidth: '0.5px', // Increase thickness
                    borderColor: '#5d1975', // Set a visible color
                    height: '90%', // Ensure it takes full height
                    alignSelf: 'stretch' // Make sure it stretches across the height of the container
                    }} 
                />

                </Grid>
                <Grid item xs={5.75}>
                    <Item  
                        sx={{
                            paddingTop: '30px',
                            paddingBottom: '83px', 
                            top: 120,
                            zIndex: 1000
                        }}
                        elevation={0}
                    >
                        <Typography variant="h4" gutterBottom 
                            sx={{
                                ml: 3,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'BlinkMacSystemFont',
                                fontWeight: 500,
                                letterSpacing: '0rem',
                                textDecoration: 'none'
                            }}>
                            Tear Sheet
                        </Typography>
                        <Divider orientation="horizontal" variant='middle' flexItem 
                            sx={{ 
                                borderWidth: '0.5px', // Increase thickness
                                marginBottom: '30px',
                                borderColor: '#5d1975', // Set a visible color
                                width: '98%', // Ensure it takes full height
                                alignSelf: 'stretch' // Make sure it stretches across the height of the container
                            }} 
                        />
                        <PortfolioHistoryTable excessReturn={props.excessReturn} years={props.years} DATAAnnualReturns={props.DATAAnnualReturns} SPYAnnualReturns={props.SPYAnnualReturns} SPYEqAnnualReturns={props.SPYEqAnnualReturns}
                            dataCAGR={props.dataCAGR} spyCAGR={props.spyCAGR} spyeqCAGR={props.spyeqCAGR} dataReturn={props.dataReturn} spyReturn={props.spyReturn} spyEqReturn={props.spyEqReturn}
                        />
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}