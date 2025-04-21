import React from 'react';
import { useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { height, textAlign } from '@mui/system';

function Documentation() {

    const [showInputs, setShowInputs] = useState(false);

    const [showGraphing, setShowGraphing] = useState(false);

    const [showDownloading, setShowDownloading] = useState(false);

    const [showComposition, setShowComposition] = useState(false);

    const [showTearSheet, setShowTearSheet] = useState(false);
    
    const [showToAdd, setShowToAdd] = useState(false);

    const handleInputs = () => {
        setShowInputs(true);
        setShowGraphing(false);
        setShowDownloading(false);
        setShowComposition(false);
        setShowTearSheet(false);
        setShowToAdd(false);
    }

    const handleGraphs = () => {
        setShowInputs(false);
        setShowGraphing(true);
        setShowDownloading(false);
        setShowComposition(false);
        setShowTearSheet(false);
        setShowToAdd(false);
    }

    const handleDownloads = () => {
        setShowInputs(false);
        setShowGraphing(false);
        setShowDownloading(true);
        setShowComposition(false);
        setShowTearSheet(false);
        setShowToAdd(false);
    }

    const handlePortfolio = () => {
        setShowInputs(false);
        setShowGraphing(false);
        setShowDownloading(false);
        setShowComposition(true);
        setShowTearSheet(false);
        setShowToAdd(false);
    }

    const handleTearSheet = () => {
        setShowInputs(false);
        setShowGraphing(false);
        setShowDownloading(false);
        setShowComposition(false);
        setShowTearSheet(true);
        setShowToAdd(false);
    }

    const handleAdd = () => {
        setShowInputs(false);
        setShowGraphing(false);
        setShowDownloading(false);
        setShowComposition(false);
        setShowTearSheet(false);
        setShowToAdd(true);
    }

    const buttons = [
        <Button sx={{ textAlign: 'left', justifyContent: 'flex-start', width: '100%' }} onClick={handleInputs}>Backtest Inputs</Button>,
        <Button sx={{ textAlign: 'left', justifyContent: 'flex-start', width: '100%' }} onClick={handleGraphs}>Graphing Returns and Calculations</Button>,
        <Button sx={{ textAlign: 'left', justifyContent: 'flex-start', width: '100%' }} onClick={handleDownloads}>Downloading Data and Saving Criteria</Button>,
        <Button sx={{ textAlign: 'left', justifyContent: 'flex-start', width: '100%' }} onClick={handlePortfolio}>Portfolio Composition</Button>,
        <Button sx={{ textAlign: 'left', justifyContent: 'flex-start', width: '100%' }} onClick={handleTearSheet}>Tear Sheet</Button>,
        <Button sx={{ textAlign: 'left', justifyContent: 'flex-start', width: '100%' }} onClick={handleAdd}>Version Updates</Button>,
        ];
    
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1a2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        }));
    
    return (
        <div>
            <Typography variant="h4" gutterBottom 
                sx={{
                ml: 3,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'BlinkMacSystemFont',
                fontWeight: 500,
                letterSpacing: '0rem',
                textDecoration: 'none'
                }}>
            Documentation
            </Typography>
            <Divider orientation="horizontal" variant='middle' flexItem 
                sx={{ 
                    borderWidth: '0.5px', // Increase thickness
                    marginTop: '30px',
                    marginBottom: '30px',
                    borderColor: '#5d1975', // Set a visible color
                    width: '98%', // Ensure it takes full height
                    alignSelf: 'stretch' // Make sure it stretches across the height of the container
                }} 
            />
            <Box sx= {{ flexGrow: 1, display: 'flex'}}>
                <Grid container spacing={3}>
                    
                    <Grid item xs={3.25}>
                        <Item elevation={0}
                            sx={{
                                paddingTop: '30px',
                                ml: 4,
                                position: 'sticky',
                                top: 120,
                                zIndex: 1000
                              }}
                        >
                            <ButtonGroup
                                orientation="vertical"
                                aria-label="Vertical button group"
                                variant="text"
                               
                            >
                                {buttons}
                            </ButtonGroup>
                        </Item>
                    </Grid>
                    <Grid item xs={0.5}><Divider orientation="vertical" variant='middle' flexItem 
                        sx={{ 
                            borderRightWidth: '0.5px', // Increase thickness
                            mt: 3,
                            mr: 2,
                            borderColor: '#5d1975', // Set a visible color
                            height: '90%', // Ensure it takes full height
                            alignSelf: 'stretch' // Make sure it stretches across the height of the container
                        }} 
                        /></Grid>
                    <Grid item xs={8.25}>
                            <Item elevation={0}>
                                {showInputs && 
                                    <div>
                                        <h2> <b>Inputs</b> </h2>

                                        <p> <b>BACKTEST NAME: </b> <br></br><br></br> An optional criteria that is used for the purpose of allowing you to download and save your backtests according to naming preferences. </p>
                                        <p> <b>STOCK INDEX: </b> <br></br><br></br>The bucket of companies at which you can choose from. <b>As of now, the data we have only allows you to choose from S&P 500 companies</b></p>
                                        <p> <b>LOOKBACK PERIOD: </b> <br></br><br></br>Determines which published documents and DATA scores will be considered when determining the portfolio during each portfolio rebalancing period. For example, if a portfolio is meant to rebalance its composition on January 1, a lookback period of 1 QUARTER will consider the document any company has published and has been scored since the beginning of Q4 of the previous year.
                                        <br></br> <br></br> If the lookback period is 2 quarters and a given company has each 10-K for the two quarters as matching the other decision criteria (i.e. in searching for top 10 most truthful documents, in a 2 QUARTER lookback period, both the AAPL 10-Ks appear), this company will only be included in a given portfolio once.
                                        </p>
                                        <p> <b> DOCUMENT TYPE: </b> <br></br><br></br> Determines the set of documents that will be searched from. "ANY" criteria selects 10-Qs and 10-Ks as all the other documents are not yet included in the dataset</p>
                                        <p> <b> PORTFOLIO REBALANCING PERIOD: </b> <br></br><br></br> Determines how often the composition of the portfolio will be re-evaluated in accordance to the decision criteria. Because new documents are added only once a quarter, having a portfolio rebalancing period of 1 month will not significant alter the portfolio. <br></br><br></br>When a portfolio rebalances, each of the equities are given an equal weighting of the portfolio's total value on the date that it is rebalanced.</p>
                                        <p> <b> PRICE REBALANCING PERIOD: </b> <br></br><br></br> Determines how often the portfolio weightings themselves are rebalanced to ensure the portfolio returns to being equal weighted. For example, for a portfolio of 3 companies, if the portfolio is rebalanced by price every 2 days, then every 2 days, shares will be bought and/or sold to ensure that each equity in the portfolio accounts for exactly 33.3% of the portfolio. <br></br><br></br> Only TRADING DAYS can currently be selected.</p>
                                        <p> <b> CHECK BOXES: </b> <br></br><br></br> Checking the checkboxes will enable the appropriate criteria.</p> 
                                        <p> <b> ABSOLUTE CRITERIA: </b> <br></br><br></br> Selects the Top X most truthful OR deceptive companies for each portfolio. This effectively puts a limit of the number of companies in the portfolio at all times. It can be paried with other search criteria to get a more selective search criteria. The number selected is limited by the stock index chosen. For example, can only input from 0-500 if using the S&P 500</p>
                                        <p> <b> RELATIVE CRITERIA: </b> <br></br><br></br> Searches through all documents whose DATA score is above or below a certain amount. Range of input is <b> -100% to 100% </b></p>
                                        <p> <b> PAGE COUNT: </b> <br></br><br></br> Documents are selected based on their number of pages. Documents outside the page count criteria will be excluded from the search. </p>
                                        <p> <b> DECEPTIVE FRAG %: </b> <br></br><br></br> Each document has a certain percentage of its fragments as being labelled as either deceptive or truthful. This sorts documents based on the portion of a given document that is deceptive/truthful.</p>
                                        <p> <b> TRADING LAG: </b> <br></br><br></br> The amount of days between when the portfolio is actually rebalanced and when the next portfolio of equities has been selected. For example, for a portfolio being rebalanced annually, a lookback period of 1 QUARTER, and a trading lag of 4 days, on January 1, the portfolio is meant to lookback exactly 1 quarter from the day to determine the equities that match the decision criteria. After 4 trading days (which depending on the year can be any day after January 5), the first trades are executed to complete each holding.</p>
                                        <p> <b> NUMBER OF DAYS TO ENTER AND EXIT TRADE: </b> <br></br><br></br> Whenever any equity is meant to be sold or bought, it will take exactly this many trading days to complete to prevent slippage, for both portfolio rebalancing and price rebalancing. As of now, however, <b> days to enter and exit a trade is only considered when rebalancing the entire portfolio. </b> For example, if I am rebalancing my entire portfolio and am set to buy 300 shares of AAPL, if the inputted days to enter the trade is 3, then it takes 3 trading days to purchase exactly 300 shares, so 100 on each day.  <br></br><br></br> It is important to note that the price rebalancing period must be greater than the greater of the days to enter and exit a trade, otherwise it would be impossible to definitively determine the actual portfolio value while buying and selling shares due to the frequency at which rebalancing takes place. </p>
                                    </div>
                                }
                                {showGraphing && 
                                    <div>
                                        <h2> <b>Graphing and Calculations</b> </h2>

                                        <p> <b>LINE GRAPH: </b> <br></br><br></br> The line graph displays 3 different portfolios/ETFs. It shows the equal weighted S&P 500 (SPXEW), the S&P 500 (SPY), and the returns created by the tested DATA strategy, taking into consideration factors such as rebalancing and trading costs. </p>
                                        <p> <b>HOW RETURNS ARE CALCULATED and PROCESSED (EXAMPLE): </b> <br></br> <br></br>Take a DATA strategy in which we invest in the 3 most truthful equities for 3 years (2021-2024) with a lookback period of 1 quarter, with trading costs of $0.05 per share, portfolio rebalanced annually, rebalanced for price every 5 days, 2 days to enter and exit all trades, and an initial portfolio value of $1,000,000. <br></br><br></br> 1. Jan 4, 2021 (first trading day of the year). Based on all documents published from Oct. 1 to Jan. 1 of 2020, it is determined that AAPL, UBER, GOOG are the 3 most truthful companies. <br></br> <br></br>
                                        2. We invest $333,333.33 in each company. It takes 2 days to enter the trade. On each day for two days, that means we have to purchase $166,666,66 of each equity. On Jan. 4, AAPL is $500, GOOGL is $300, UBER is $900. On Jan. 5, AAPL is $600, GOOGL is $200, UBER is $850. The backtest takes the average price across all buy days and fills the holding that way, due to the fact that we are purchasing the same $ value of each equity each of the days we are entering the trade. For AAPL, we purchase 606 shares for an average of $550.05 across the two days, given the trading costs. Note only whole number shares can be bought or sold. The exact number was 606.0055 shares, but this can not be done.
                                        Across two days, we also purchase $333,333.33/$250.05 = 1333 shares of GOOGL (for an average of $250 per share plus a trading cost of $0.05 per share for $250.05) and $333,333.33/$875.05 = 380 shares of UBER for an averae of $875 across two days with an added $0.05 cost per share. Finally, we have entered the market and have an equal weight portfolio of three companies.</p>
                                        <p> 3. Based on above, our current portfolio consists of 1333 shares of GOOGL, 606 shares of AAPL, and 380 shares of UBER. After 5 trading days from Jan. 5 (when orders have been fulfilled), so on Jan. 12, we have to rebalance by price to ensure the portfolio is back to equal weight. <br></br>   </p>
                                        <p> 4. On Jan. 12, GOOGL is now $350, AAPL is $400, and UBER is $1,000 per share, meaning our GOOGL holding is $466,550, AAPL is $242,400, UBER is $380,000. Portfolio is now worth $1,088,950. To be equal weight, each holding needs to be worth $1,088,950/3 = $362,983.33. So to rebalance for price, $380,000 - $362,983.33 = $17,016.67 of UBER needs to be sold. Given its price of $1,000, 17 shares of UBER are sold for $999.95, provided the trading costs. The holding is now at the correct value. This is done for each equity in the portfolio until it is equal weighted. <b> It is important to note that the number of days to enter and exit trade of 2 should be applied to rebalancing for price every 5 days, but this has not been implemented yet. </b></p>
                                        <p> 5. This process for price rebalancing is repeated until Jan. 1, 2022 at which a new portfolio of the three most truthful companies will be selected. This is processed forward several years to eventually produce the returns reflected on the line graph. </p>
                                    </div>
                                }
                                {showDownloading && 
                                   <div>
                                        <h2> <b>Downloading Data and Saving Criteria</b> </h2>

                                        <p> There are two ways to save a backtest: the DOWNLOAD CSV button and SAVE CRITERIA BUTTON <b><br></br><br></br>DOWNLOAD CSV: </b> <br></br><br></br> Displays the daily value of the portfolio from 2008-2024 based on real-time prices and the actual composition of the strategy. <b> To come is the portfolio value during portfolio rebalancing periods (not to be confused with price rebalancing periods). In the days that the entire portfolio composition is rebalanced (indicated by the input for days to enter/exit a trade), the value of the portfolio is not indicated and is missing on the CSV. </b> </p>
                                        <p> <b> SAVE CRITERIA </b> <br></br><br></br> This downloads two files. One saves all decision rules inputted while the other file saves the history of the DATA portfolio throughout time. </p>
                                    </div>
                                }
                                {showComposition && 
                                    <p> Composition </p>
                                }
                                {showTearSheet && 
                                    <p> Tear Sheet </p>
                                }
                                {showToAdd && 
                                    <p> To Add... </p>
                                }
                            </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Documentation;