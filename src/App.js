import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import './App.css';
import { LineChart } from '@mui/x-charts/LineChart';
import { LineChartPro } from '@mui/x-charts-pro/LineChartPro';
import Button from '@mui/material/Button';
import CriteriaOutput from './CriteriaOutput.js';
import CriteriaInput from './CriteriaInput.js';
import Table from './Table.js';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { Snackbar, linearProgressClasses } from '@mui/material';
import Slider from '@mui/material/Slider';
import data from './spy.json';
import eqdata from './spy_eq.json';
import risk_free_data from './risk_free.json';
import ResponsiveAppBar from './AppBar.js';
import _ from 'lodash';
import Switch from '@mui/material/Switch';
import DenseTable from './PortfolioTable.js';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DataAlertGrid from './DataAlertGrid.js';
import { ContinuousColorLegend } from '@mui/x-charts';
import CheckboxStack from './CheckboxStack.js';
import Documentation from './Documentation.js';

function App() {

  let tPortfolioDictionary = {};
  const [xAxisDates, setXAxisDates] = useState([]);
  const [yAxisValues, setYAxisValues] = useState([]);

  const updateChartData = (xData,yData) => {
    setXAxisDates(xData);
    setYAxisValues(yData);
  }

  const [xAxisTime, setXAxisTime] = useState([]);
  const [yAxisPortfolioValue, setYAxisPortfolioValue] = useState([]);
  const [benchmarkData, setBenchmarkData] = useState([]);
  const [benchmarkDataEqualWeight, setBenchmarkDataEqualWeight] = useState([]);

  const displayData = (x, y, spy, eqspy) => {
    setXAxisTime(x);
    setYAxisPortfolioValue(y);
    setBenchmarkData(spy);
    setBenchmarkDataEqualWeight(eqspy);
  }

  const [alertMessages, setAlertMessages] = useState(["Stock indexes other than S&P 500 not available.", "Can only rebalance according to price based on trading days at his time.","D.A.T.A. data set with S&P 500 composition not fully complete."]);
  let alertID = 0;

  const [returnsGenerated, setReturnsGenerated] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  //console.log(eqdata);
  //console.log(data);

  

 //let xAxisDates = [];
 //let yAxisValues = [];

  const [selectedIndex, setSelectedIndex] = useState('S&P 500');
  const [maxCompanies, setMaxCompanies] = useState(500);

  const optionSelected = (event) => {
    setSelectedIndex(event.target.value);
    setCompaniesFound(false);
    const newindex = event.target.value;
    switch(newindex)
    {
      case("S&P 400"):
        setMaxCompanies(400);
        break;
      case("S&P 500"):
        setMaxCompanies(500);
        break;
      case("Russell 1000"):
        setMaxCompanies(1000);
        break;
      case("Russell 2000"):
        setMaxCompanies(2000);
        break;
      case("Russell 3000"):
        setMaxCompanies(3000);
        break;
      default:
        setMaxCompanies(500);
        break;
    }
    
  }

  const [selectedLookback, setSelectedLookback] = useState('1 QUARTER');

  const lookbackSelected = (event) => {
    setCompaniesFound(false);
    setSelectedLookback(event.target.value);
  }

  const [selectedRebalancingPeriod, setSelectedRebalancingPeriod] = useState("Monthly");

  const rebalancingPeriodSelected = (event) => {
    setCompaniesFound(false);
    setSelectedRebalancingPeriod(event.target.value);
  }

  const [selectedPriceRebalancingPeriod, setSelectedPriceRebalancingPeriod] = useState("Trading Days");

  const priceRebalancingPeriodSelected = (event) => {
    setSelectedPriceRebalancingPeriod(event.target.value);
  }

  const [selectedDocument, setSelectedDocument] = useState('ANY');

  const documentSelected = (event) => {
    setCompaniesFound(false);
    setSelectedDocument(event.target.value);
  }

  const [selectedPageCount, setSelectedPageCount] = useState("Greater Than");

  const pageCountSelected = (event) => {
    setCompaniesFound(false);
    setSelectedPageCount(event.target.value);
  }

  const [selectedComparison, setSelectedComparison] = useState("Greater Than");

  const comparisonSelected = (event) => {
    setCompaniesFound(false);
    setSelectedComparison(event.target.value);
  }

  const [selectedChangeType, setSelectedChangeType] = useState("Greater Than");

  const changeTypeSelected = (event) => {
    setCompaniesFound(false);
    setSelectedChangeType(event.target.value);
  }

  const [selectedUncertaintyType, setSelectedUncertaintyType] = useState("Greater Than");

  const uncertaintyTypeSelected = (event) => {
    setCompaniesFound(false);
    setSelectedUncertaintyType(event.target.value);
  }

  const [selectedLongTermFocusType, setSelectedLongTermFocusType] = useState("Greater Than");

  const longTermFocusTypeSelected = (event) => {
    setCompaniesFound(false);
    setSelectedLongTermFocusType(event.target.value);
  }

  const [selectedShortTermFocusType, setSelectedShortTermFocusType] = useState("Greater Than");

  const shortTermFocusTypeSelected = (event) => {
    setCompaniesFound(false);
    setSelectedShortTermFocusType(event.target.value);
  }

  const [selectedInternalFocusType, setSelectedInternalFocusType] = useState("Greater Than");

  const internalFocusTypeSelected = (event) => {
    setCompaniesFound(false);
    setSelectedInternalFocusType(event.target.value);
  }

  const [selectedExternalFocusType, setSelectedExternalFocusType] = useState("Greater Than");

  const externalFocusTypeSelected = (event) => {
    setCompaniesFound(false);
    setSelectedExternalFocusType(event.target.value);
  }

  const [selectedTradingCostType, setSelectedTradingCostType] = useState("Dollars Per Share");

  const handleTradingCostType = (event) => {
    setSelectedTradingCostType(event.target.value);
  } 

  const [selectedRelative, setSelectedRelative] = useState("Deceptive");

  const relativeSelected = (event) => {
    setCompaniesFound(false);
    setSelectedRelative(event.target.value);
  }

  const [selectedRelativeCriteria, setSelectedRelativeCriteria] = useState("Greater Than");

  const relativeCriteriaSelected = (event) => {
    setCompaniesFound(false);
    setSelectedRelativeCriteria(event.target.value);
  }

  const [selectedNegativeComparison, setSelectedNegativeComparison] = useState("Less Than or Equal to");

  const negativeComparisonSelected = (event) => {
    setCompaniesFound(false);
    setSelectedNegativeComparison(event.target.value);
  }

  const [selectedPositiveComparison, setSelectedPositiveComparison] = useState("Greater Than");

  const positiveComparisonSelected = (event) => {
    setCompaniesFound(false);
    setSelectedPositiveComparison(event.target.value);
  }

  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (event) => {
    setCompaniesFound(false);
    setSliderValue(event.target.value);
  };

  const [changeYearSliderValue, setChangeYearSliderValue] = useState(0);

  const handleYearSliderChange = (event) => {
    setCompaniesFound(false);
    setChangeYearSliderValue(event.target.value);
  }

  const [uncertaintyValue, setUncertaintyValue] = useState(0);

  const uncertaintySliderChange = (event) => {
    setCompaniesFound(false);
    setUncertaintyValue(event.target.value);
  }

  const [longTermValue, setLongTermValue] = useState(0);

  const longTermSliderChange = (event) => {
    setCompaniesFound(false);
    setLongTermValue(event.target.value);
  }

  const [shortTermValue, setShortTermValue] = useState(0);

  const shortTermSliderChange = (event) => {
    setCompaniesFound(false);
    setShortTermValue(event.target.value);
  }

  const [internalValue, setInternalValue] = useState(0);

  const internalSliderChange = (event) => {
    setCompaniesFound(false);
    setInternalValue(event.target.value);
  }

  const [externalValue, setExternalValue] = useState(0);

  const externalSliderChange = (event) => {
    setCompaniesFound(false);
    setExternalValue(event.target.value);
  }

  const [negativeSliderValue, setNegativeSliderValue] = useState(0);

  const handleNegSliderChange = (event) => {
    setCompaniesFound(false);
    setNegativeSliderValue(event.target.value);
  }

  const [positiveSliderValue, setPositiveSliderValue] = useState(0);

  const handlePosSliderChange = (event) => {
    setCompaniesFound(false);
    setPositiveSliderValue(event.target.value);
  }

  
  const [absoluteValue, setAbsoluteValue] = useState(1);

  const handleAbsoluteChange = (event) => {
    setCompaniesFound(false);
    setAbsoluteValue(event.target.value);
  }

  const [relativeValue, setRelativeValue] = useState(0);

  const handleRelativeChange = (event) => {
    setCompaniesFound(false);
    setRelativeValue(event.target.value);
  }

  const [pageCountValue, setPageCountValue] = useState(1);

  const handlePageCountChange = (event) => {
    setCompaniesFound(false);
    setPageCountValue(event.target.value);
  }
  
  /*
  const absoluteValue = useRef([1,30]);

  //const [temp, setTemp] = useState([20,37]);

  const handleAbsoluteChange = (event, newValue) => {
    absoluteValue.current = event.target.value;
    //setTemp(newValue);
  };
  */

  const priceRebalancingFrequency = useRef(1);

  const handlePriceRebalancingFrequency = (event) => {
    priceRebalancingFrequency.current = event.target.value;
  }

  const [backtestName, setBacktestName] = useState();

  const handleBacktestName = (event) => {
    setBacktestName(event.target.value);
  }
  /*
  const [priceRebalancingFrequency, setPriceRebalancingFrequency] = useState(1);

  const handlePriceRebalancingFrequency = (event) => {
    setPriceRebalancingFrequency(event.target.value);
  }
  */
  const [lagValue, setLagValue] = useState(4);

  const handleLagValue = (event) => {
    setLagValue(event.target.value);
  }

  const [enterTradeValue, setEnterTradeValue] = useState(2);

  const handleEnterTrade = (event) => {
    setEnterTradeValue(event.target.value);
  }

  const [exitTradeValue, setExitTradeValue] = useState(3);

  const handleExitTrade = (event) => {
    setExitTradeValue(event.target.value);
  }

  const [assetsUnderManagement, setAssetsUnderManagement] = useState(1000000);

  const handleAssetsUnderManagement = (event) => {
    setAssetsUnderManagement(event.target.value);
    setPortfolioValue((event.target.value).replace(/,/g,''));
  }

  const [portfolioValue, setPortfolioValue] = useState(assetsUnderManagement);

  const [checkDeceptiveFragPercent, setCheckDeceptiveFragPercent] = useState(false);

  const handleDeceptiveFragPercent = () => {
    setCompaniesFound(false);
    setCheckDeceptiveFragPercent(!checkDeceptiveFragPercent);
  }

  const [checkPositiveFrag, setCheckPositiveFrag] = useState(false);

  const handlePositiveFrag = () => {
    setCompaniesFound(false);
    setCheckPositiveFrag(!checkPositiveFrag);
  }

  const [checkNegativeFrag, setCheckNegativeFrag] = useState(false);

  const handleNegativeFrag = () => {
    setCompaniesFound(false);
    setCheckNegativeFrag(!checkNegativeFrag);
  }

  const [checkYearChange, setCheckYearChange] = useState(false);

  const handleYearChange = () => {
    setCompaniesFound(false);
    setCheckYearChange(!checkYearChange);
  }

  const [checkFinancialUncertainty, setCheckFinancialUncertainty] = useState(false);

  const handleFinancialUncertainty = () => {
    setCompaniesFound(false);
    setCheckFinancialUncertainty(!checkFinancialUncertainty);
  }

  const [checkLongTermFocus, setCheckLongTermFocus] = useState(false);

  const handleLongTermFocus = () => {
    setCompaniesFound(false);
    setCheckLongTermFocus(!checkLongTermFocus);
  }

  const [checkShortTermFocus, setCheckShortTermFocus] = useState(false);

  const handleShortTermFocus = () => {
    setCompaniesFound(false);
    setCheckShortTermFocus(!checkShortTermFocus);
  }

  const [checkInternalFocus, setCheckInternalFocus] = useState(false);

  const handleInternalFocus = () => {
    setCompaniesFound(false);
    setCheckInternalFocus(!checkInternalFocus);
  }

  const [checkExternalFocus, setCheckExternalFocus] = useState(false);

  const handleExternalFocus = () => {
    setCompaniesFound(false);
    setCheckExternalFocus(!checkExternalFocus);
  }

  const [checkPageCount, setCheckPageCount] = useState(false);

  const handlePageCount = () => {
    setCompaniesFound(false);
    setCheckPageCount(!checkPageCount);
  }

  const [checkAbsolute, setCheckAbsolute] = useState(false);

  const handleAbsolute = () => {
    setCompaniesFound(false); //Any edits to this field box will require you to find new portfolio
    setCheckAbsolute(!checkAbsolute);
  }

  const [checkRelative, setCheckRelative] = useState(false);

  const handleRelative = () => {
    setCompaniesFound(false);
    setCheckRelative(!checkRelative);
  }

  const [tradingCosts, setTradingCosts] = useState();

  const handleTradingCosts = (event) => {
    setTradingCosts(event.target.value);
  }

  const handleSelectAll = (event) => {
      setCheckAbsolute(event.target.checked);
      setCheckRelative(event.target.checked);
      setCheckPageCount(event.target.checked);
      setCheckDeceptiveFragPercent(event.target.checked);
      setCheckPositiveFrag(event.target.checked);
      setCheckNegativeFrag(event.target.checked);
      setCheckYearChange(event.target.checked);
      setCheckFinancialUncertainty(event.target.checked);
      setCheckLongTermFocus(event.target.checked);
      setCheckShortTermFocus(event.target.checked);
      setCheckInternalFocus(event.target.checked);
      setCheckExternalFocus(event.target.checked);
  };

  const [companiesFoundTimeStamp, setCompaniesFoundTimeStamp] = useState("");

  const [backtestCompleteTimeStamp, setBacktestCompleteTimeStamp] = useState("");

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1a2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  const [outputText, setOutputText] = useState("");

  

  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);

  let currPortfolioDictionary = {};

  //PortfolioValue above

  const [countDaysSincePriceRebalance, setCountDaysSincePriceRebalance] = useState(0);

  const [daysBetweenPriceRebalance, setDaysBetweenPriceRebalance] = useState(0)

  let portfolioHistory = {};

  const [detailedPortfolio, setDetailedPortfolio] = useState({});

  const [excessReturn, setExcessReturn] = useState({});

  const [dataCAGR, setDataCAGR] = useState();

  const [dataReturn, setDataReturn] = useState();

  const [spyCAGR, setSpyCAGR] = useState();

  const [spyReturn, setSpyReturn] = useState();

  const [spyeqCAGR, setSpyeqCAGR] = useState();

  const [spyEqReturn, setSpyEqReturn] = useState();
  
  let portfolio = [];

  let newPortfolioValue = 0;

  let rebalanceHistory = {};

  let rebalanceHistoryShares = {};

  let portfolioPriceBook = {};

  let portfolioPriceBookFull = {};

  let portfolioPriceBookDateIndexed = {};

  const [dATAAnnualReturns, setDATAAnnualReturns] = useState({});
  const [sPYAnnualReturns, setSPYAnnualReturns] = useState({});
  const [sPYEqAnnualReturns, setSPYEqAnnualReturns] = useState({});

  const inputEl = useRef(null);

  const handleChange = (event) => {
    inputEl.current = event.target.value;
  }

  const switchCheck = useRef(true);

  const schange = () => {
    let prev = switchCheck.current;
    switchCheck.current = !prev;
  }
  const [fullHistory, setFullHistory] = useState({});

  const convertToCSV = (obj) => {
    const headers = ['Date', 'Portfolio Value (Thousands of Dollars)'];
    const rows = Object.entries(obj);

    let csvContent = headers.join(',') + '\n'; // Add headers
    rows.forEach(([key, value]) => {
      csvContent += `${key},${value}\n`; // Add each row
    });

    return csvContent;
  };

  // Function to trigger the download
  const downloadCSV = () => {
    const csvContent = convertToCSV(fullHistory);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    let docTitle;
    const dt = new Date();
    const currDate = String(dt.getFullYear())+'-'+String(dt.getMonth())+'-'+String(dt.getDate())+'_'+String(dt.getHours())+';'+String(dt.getMinutes())+';'+String(dt.getSeconds());
    if (backtestName !== undefined)
    {

      docTitle = backtestName.replace(/ /g, "_") + '_' + currDate + '_portfolio_history';
    } else {
      docTitle = currDate + '_portfolio_history';
    }
    link.setAttribute('download', docTitle + '.csv'); // Set the download file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Cleanup the DOM
  };
  
  /*
  useEffect(() => {
    const fetchData = async () => {
      //Rebalancing, may need to create more useState global variables to store information such as the portfolio of the previous rebalancing period and the value of each equity in that previous portfolio
      
      let tPrevPortfolio = {
        "AAPL": 400000,
        "TSLA": 300000,
        "META": 300000
      }

      
      for (let key in data)
      {
        console.log(key, data[key]);
      }
      
      let tPortfolio = ['AAPL','NKE', 'GOOG'];
      let tNumEquities = tPortfolio.length;
      let tPortfolioTotalValue = {};

      let tPortfolioStartingValue = 1000000;
      let tPositionSize = tPortfolioStartingValue/tNumEquities;

      let tDaysEnterTrade = 3;
      let tDaysExitTrade = 5;

      let tLowerDateBoundary = 20090101; 
      let tAbsoluteDate = 20090201; //1 month rebalancing period test 

      let tPortfolioValueEndOfRebalancingPeriod = 0;

      

      for (let i = 0; i < tNumEquities; i++)
      {
        // and AbsoluteDate lt ${tAbsoluteDate} and AbsoluteDate ge ${tLowerDateBoundary}
        const endpoint = `/data-api/rest/History?$filter=Ticker eq '${tPortfolio[i]}' and AbsoluteDate lt ${tAbsoluteDate} and AbsoluteDate ge ${tLowerDateBoundary}`;
        const response = await fetch(`${endpoint}`);
        const result = await response.json();
        console.table(result.value);
        const stockHistory = result.value;
        
        let tPurchaseSizePerDayPerEquity = tPositionSize/tDaysEnterTrade;
      
        let tCurrDate = tLowerDateBoundary;
        let tSellDate = stockHistory[stockHistory.length-tDaysExitTrade]["AbsoluteDate"]; //See if you sell before buying next portfolio (makes sense to sell before hand or else you wont have the money to buy the next set of stocks)
        console.log(tSellDate);

        let j = 0;

        let tTotalSharesBought = 0;
        while (j < tDaysEnterTrade)
        {
          let tCurrStockPrice = stockHistory[j]["Close"];
          let tSharesBought = tPurchaseSizePerDayPerEquity/tCurrStockPrice;
          console.log("Bought ", tSharesBought, " shares of ", stockHistory[j]["Ticker"], " at ", tCurrStockPrice, " on ", stockHistory[j]["Date"]);
          tTotalSharesBought += tSharesBought;
          if (stockHistory[j]["Date"] in tPortfolioDictionary)
          {
            tPortfolioDictionary[stockHistory[j]["Date"]] += tTotalSharesBought*tCurrStockPrice;
          }
          else 
          {
            tPortfolioDictionary[stockHistory[j]["Date"]] = tTotalSharesBought*tCurrStockPrice;
          }
          j++;
        }
        console.log("In total ,", tTotalSharesBought, " shares of ", tPortfolio[i], " have been purchased for this rebalancing period for ", tPositionSize);

        let tSharesToSellPerDayPerEquity = tTotalSharesBought/tDaysExitTrade;
        let tFinalValueOfShares = 0;

        let s = stockHistory.length - tDaysExitTrade;

        while (j < s)
        {
          let tDailyStockPrice = stockHistory[j]["Close"];
          let tIntermediateValueOfStock = tDailyStockPrice*tTotalSharesBought;
          console.log("Value of ", stockHistory[j]["Ticker"], " on ", stockHistory[j]["Date"], " is ", tIntermediateValueOfStock);
          if (stockHistory[j]["Date"] in tPortfolioDictionary)
          {
            tPortfolioDictionary[stockHistory[j]["Date"]] += tIntermediateValueOfStock;
          }
          else 
          {
            tPortfolioDictionary[stockHistory[j]["Date"]] = tIntermediateValueOfStock;
          }
          j++;
        }
        let tRemainingShares = tTotalSharesBought;
        while (s < stockHistory.length)
        {
          let tCurrStockPrice = stockHistory[s]["Close"];
          let tValueOfSellShares = tCurrStockPrice * tSharesToSellPerDayPerEquity;
          console.log("Sold ", tSharesToSellPerDayPerEquity, " of ", tPortfolio[i], " worth ", tValueOfSellShares, " on ", stockHistory[s]["Date"]);
          tFinalValueOfShares += tValueOfSellShares;
          
          tRemainingShares -= tSharesToSellPerDayPerEquity;
          let tValueOfRemainingShares = (tRemainingShares)*(tCurrStockPrice);
          if (stockHistory[s]["Date"] in tPortfolioDictionary)
          {
            tPortfolioDictionary[stockHistory[s]["Date"]] += tValueOfRemainingShares;
          }
          else 
          {
            tPortfolioDictionary[stockHistory[s]["Date"]] = tValueOfRemainingShares;
          }
          if (tPortfolioDictionary[stockHistory[s]["Date"]] < 1)
          {
            tPortfolioDictionary[stockHistory[s]["Date"]] = 0;
          }
          s+=1;
        }
        tPortfolioValueEndOfRebalancingPeriod += tFinalValueOfShares;
        console.log("Sold all holds of ", tPortfolio[i], " for ", tFinalValueOfShares);
      }
      console.log(tPositionSize, tPortfolioStartingValue);
      console.log("At the end of the rebalancing period, ", tPortfolioStartingValue, " is now worth ", tPortfolioValueEndOfRebalancingPeriod);
      console.log(tPortfolioDictionary);
      
      let y = 1;
      let xD=[];
      let yD = [];
      for (let strDate in tPortfolioDictionary)
      {
        // Remove the dashes
        let intDate = parseInt(strDate.replace(/-/g, ''), 10);
        xD.push(strDate);
        yD.push(tPortfolioDictionary[strDate]/1000);
        y+=1;
      }
      updateChartData(xD,yD);
      console.log(data);
      
    };
    
  
    fetchData();
  }, []);
  */
  //const [temp, setTemp] = useState([20, 37]);

  const temp = useRef([20,37]);

  //const [temp, setTemp] = useState([20,37]);

  const handleTemp = (event, newValue) => {
    temp.current = event.target.value;
    //setTemp(newValue);
  };

  const label = { inputProps: { 'aria-label': 'Switch' } };

  const [companiesFound, setCompaniesFound] = useState(false);

  const [doneLoading, setDoneLoading] = useState(true);

  async function rebalance(currPortfolio, prevPortfolio, upperAbsoluteDate, absoluteDate, i)
  {
    let sellOrBuy = "NULL";
    let holdingValueEndOfPeriod = 0;
    fetchHistory(currPortfolio[i],upperAbsoluteDate,absoluteDate)
      .then((data) => {
      //console.log(data);
      let beginningSharePrice=0;
      console.log(rebalanceHistory);
      let holdingValuePerEquity = portfolioValue/currPortfolio.length;
      if (!(prevPortfolio.includes(currPortfolio[i])))
      {
        let sumEnterPrice = 0;
        for (let j = 0; j < enterTradeValue; j++)
        {
          sumEnterPrice += data[j]["Close"];
        }
        let averageEnterPrice = sumEnterPrice/enterTradeValue;
        let sharesBought = Math.floor(holdingValuePerEquity/averageEnterPrice);
        //console.log(currPortfolio[i], " was not in previous portfolio. Prev portfolio consisted of ",prevPortfolio, " Portfolio has value of ", portfolioValue, " and size of ", currPortfolio.length, ". We have now purchased ", sharesBought, " of ", currPortfolio[i], " for ", averageEnterPrice, " on ", data[0]["Date"]);
        currPortfolioDictionary[currPortfolio[i]] = sharesBought;
        sellOrBuy = "BUY";
        beginningSharePrice = averageEnterPrice;
      }
      else 
      {
        sellOrBuy = "SELL";
        let currValueHolding = currPortfolioDictionary[currPortfolio[i]] * data[0]["Close"]; //Price of stock at rebalance date
        let rebalanceDifference = holdingValuePerEquity - currValueHolding;
        if (rebalanceDifference < 0) //Need to sell
        {
          let sumExitPrice = 0;
          for (let j = 0; j < exitTradeValue; j++) //Days to sell; get average price across selling days
          {
            sumExitPrice += data[j]["Close"];
          }
          let averageExitPrice = sumExitPrice/exitTradeValue;
          let sharesToSell = Math.floor(Math.abs(rebalanceDifference)/averageExitPrice);
          currPortfolioDictionary[currPortfolio[i]] = currPortfolioDictionary[currPortfolio[i]] - sharesToSell;
          beginningSharePrice = holdingValuePerEquity/currPortfolioDictionary[currPortfolio[i]];
        }
        else //Need to buy more shares
        {
          let sumEnterPrice = 0;
          for (let j = 0; j < enterTradeValue; j++)
          {
            sumEnterPrice += data[j]["Close"];
          }
          let averageEnterPrice = sumEnterPrice/enterTradeValue;
          let sharesToBuy = Math.floor(rebalanceDifference/averageEnterPrice);
          currPortfolioDictionary[currPortfolio[i]] = currPortfolioDictionary[currPortfolio[i]] + sharesToBuy;
          beginningSharePrice = holdingValuePerEquity/currPortfolioDictionary[currPortfolio[i]];
        }
      }

      
      
      console.log(currPortfolio[i], " Started: ", beginningSharePrice, " Ended: ", parseFloat(data[data.length-1]["Close"]), parseInt(currPortfolioDictionary[currPortfolio[i]]), absoluteDate, parseFloat(data[data.length-1]["Close"])*parseInt(currPortfolioDictionary[currPortfolio[i]]));
      holdingValueEndOfPeriod = parseFloat(data[data.length-1]["Close"]) * parseInt(currPortfolioDictionary[currPortfolio[i]]);
      newPortfolioValue += holdingValueEndOfPeriod;
      console.log(holdingValueEndOfPeriod);
      if (upperAbsoluteDate in rebalanceHistory)
      {
        rebalanceHistory[upperAbsoluteDate] += holdingValueEndOfPeriod;
      }
      else {
        rebalanceHistory[upperAbsoluteDate] = holdingValueEndOfPeriod;
      }
    })
      
  }

  async function fetchHistory(ticker,upperAbsoluteDate,absoluteDate)
  {
      const endpoint = `/data-api/rest/History?$filter=Ticker eq '${ticker}' and AbsoluteDate lt ${upperAbsoluteDate} and AbsoluteDate ge ${absoluteDate}`;
      const response = await fetch(`${endpoint}`);
      const result = await response.json();
      const stockHistory = result.value;
      //console.log(stockHistory);
      return stockHistory;
  }

  async function invest(currPortfolio, absoluteDate, lowerDateBoundary)
  {
    let prevAbsoluteDate = absoluteDate;
    let dateStr = absoluteDate.toString();
    let year = parseInt(dateStr.slice(0,4));
    let month = parseInt(dateStr.slice(4,6));
    let day = parseInt(dateStr.slice(6,8));

    let decrement;
    if (selectedRebalancingPeriod === "Monthly")
    {
      decrement = 1;
    }
    else if (selectedRebalancingPeriod === "Quarterly")
    {
      decrement = 3;
    }
    else { decrement = 12; }
    let lowermonth = month - decrement;
    let loweryear = year;
    if (lowermonth < 1)
    {
      loweryear -= 1;
      lowermonth = lowermonth + 12;
    }
    prevAbsoluteDate = (loweryear*10000)+(lowermonth*100)+(day);
    let uppermonth = month + decrement;
    let upperyear = year;
    if (uppermonth > 12)
    {
      uppermonth = uppermonth - 12;
      upperyear = year + 1;
    }
    let upperAbsoluteDate = (upperyear*10000)+(uppermonth*100)+(day);
    
    //console.log("Previous portfolio: ", portfolioHistory[String(prevAbsoluteDate)]);

    let prevPortfolio = portfolioHistory[String(prevAbsoluteDate)];

    newPortfolioValue = 0;
    for (let i = 0; i < currPortfolio.length; i++)
    {
      await rebalance(currPortfolio, prevPortfolio, upperAbsoluteDate, absoluteDate, i);
      
      
      
      //if (!(currPortfolio[i] in prevPortfolio))
      //{
        
      //}
    }
    //setPortfolioValue(newPortfolioValue);
    //console.log("New portfolio value initially invested on ", absoluteDate, " at the end of the period is ", newPortfolioValue);

    console.log("PORTFOLIO ", absoluteDate, currPortfolio);
    console.log(absoluteDate, rebalanceHistory);
    for (let key in currPortfolioDictionary)
    {
      if (!(currPortfolio.includes(key)))
      {
        delete currPortfolioDictionary[key];
        console.log("DELETING ", key, currPortfolioDictionary);
      }

      //console.log(key, currPortfolioDictionary[key]);
    }

    rebalanceHistoryShares[absoluteDate] = currPortfolioDictionary;

    //Number of equities is portfolio length
    //get portfolio value from variable
    //For each company in portfolio

    //Create dictionary for date: total portfolio value
    /*
    let portfolioSize = portfolio.length;
    let startingPortfolioValue = portfolioValue;
    let positionSize = startingPortfolioValue/portfolioSize;

    for (let i = 0; i < portfolioSize; i++)
    {
      fetch all data for the stock between absolutedate and lowerdateboundary
      let purchasePerDay = positionSize/enterTradeValue //How much money we spend on the stock per day based on how many days we need to enter trade
      let sellDate = absoluteDate - exitTradeValue; //Make sure this is trading day, this is the day we are selling
      for (j < enterTradeValue)
      {
        let sharesCount = purchasePerDay/stockPrice;
        let date = lowerDateBoundary + j; //Need to make sure this date is a trading day, but this is the date we are buying
        let sellDate = 
        while (date < sellDate)
        {
          let stockValue = sharesCount * stockPriceOnDate;
          date++; //Make sure this increments correctly according to how dates are formatted
        }
        valueOfPositionAtFirstSellDate = stockValue;
      }
      //Get final value of stock position
      //Now sell based on positionSize and number of days to exit trade
    }
    */

    /*
    for (let i = 0; i < currPortfolio.length; i++)
    {
      if (currPortfolio[i] not in prevPortfolio)
      {
        getdata for ticker from lowerDateBoundary + daysentertrade
        let sumBuyPrice = 0
        for (let j = 0; j < history.length;j++)
        { 
          sumBuyPrice += history[j]["Close"]
        }
        let averageBuyPrice = sumBuyPrice/daysEnterTrade
        let sharesBought = (porfolioValue/numCompanies)/averageBuyPrice
      }
    }

    */
  }

 async function getData(absoluteDate, lowerDateBoundary) {
  //Improve this function so taht you are only querying the data that you need so it becomes faster
    let query = `AbsoluteDate lt ${absoluteDate} and AbsoluteDate ge ${lowerDateBoundary}`;
    const endpoint = `/data-api/rest/Stocks?$filter=${query}`;
    const response = await fetch(`${endpoint}`);
    let result = await response.json();
    //console.table(result.value);
    //console.log(query);

    let stocks = result.value;
    console.log(absoluteDate, lowerDateBoundary);
    console.log(stocks);
    //console.log(stocks.length)
    portfolio = [];
    let dict = {};

    //if (absoluteDate === 20140101) { console.log(stocks); }

    for (let i = 0; i < stocks.length; i++)
    {
      /*
      if (selectedRelative === "Deceptive")
      {
        if (Object.keys(absoluteDictionary).length < maxCompanies)
        {
          absoluteDictionary[[stocks][i]["Ticker"]] = stocks[i]["DataScore"];
        }
      }
      */

      
      if (stocks[i]["SandP"] === "False")
      {
        continue;
      }

      let datascore = parseFloat(stocks[i]["DataScore"].substring(0,stocks[i]["DataScore"].length-1));
      let inputDataScore = parseFloat(relativeValue);
      if (checkRelative)
      {
        if (selectedRelativeCriteria === "Greater Than")
        {
          if (datascore <= inputDataScore)
          {
            continue;
          }
        }
        else if (selectedRelativeCriteria === "Less Than or Equal to")
        {
          if (datascore >= inputDataScore)
          {
            continue;
          }
        }
      }

      let pageCount = pageCountValue;
      if (checkPageCount)
      {
        if (selectedPageCount === "Greater Than")
        {
          if (stocks[i]["PageCount"] <= pageCount)
          {
            continue;
          }
        }
        else if (selectedPageCount === "Less Than or Equal to")
        {
          if (stocks[i]["PageCount"] >= pageCount)
          {
            continue;
          }
        }
      }
      

      let deceptiveFragPercentage = sliderValue/100;
      if (checkDeceptiveFragPercent)
      {
        if (selectedComparison === "Greater Than")
          {
            
            if (stocks[i]["DeceptiveFragmentsPercentage"] <= deceptiveFragPercentage)
            {
              continue;
            }
          }
          else if (selectedComparison === "Less Than or Equal to")
          {
            if (stocks[i]["DeceptiveFragmentsPercentage"] >= deceptiveFragPercentage)
            {
              continue;
            }
          }
      }
      
      

      let positiveFragDataScore = positiveSliderValue/100;
      if (checkPositiveFrag)
      {
        if (selectedPositiveComparison === "Greater Than")
        {
          if (stocks[i]["FragmentsPositiveAvg"] <= positiveFragDataScore)
          {
            continue;
          }
        }
        else if (selectedPositiveComparison === "Less Than or Equal to")
        {
          if (stocks[i]["FragmentsPositiveAvg"] >= positiveFragDataScore)
          {
            continue;
          }
        }
      }

      

      let negativeFragDataScore = negativeSliderValue/100;
      if (checkNegativeFrag)
      {
        if (selectedNegativeComparison === "Greater Than")
        {
          if (stocks[i]["FragmentsNegativeAvg"] <= negativeFragDataScore)
          {
            continue;
          }
        }
        else if (selectedNegativeComparison === "Less Than or Equal to")
        {
          if (stocks[i]["FragmentsNegativeAvg"] >= negativeFragDataScore)
          {
            continue;
          }
        }
      }

      


      let yearOnYearChange = changeYearSliderValue/100;
      if (checkYearChange)
      {
        if (selectedChangeType === "Greater Than")
        {
          if (stocks[i]["YearOnYearChange"] <= yearOnYearChange)
          {
            continue;
          }
        }
        else if (selectedChangeType === "Less Than or Equal to")
        {
          if (stocks[i]["YearOnYearChange"] >= yearOnYearChange)
          {
            continue;
          }
        }
      }


      
      let stockUncertainty = stocks[i]["FinancialUncertainty"].substring(0,stocks[i]["FinancialUncertainty"].length-1);
      let uncertaintyFloat = parseFloat(stockUncertainty);
      if (checkFinancialUncertainty)
      {
        if (selectedUncertaintyType === "Greater Than")
        {
          if (uncertaintyFloat <= uncertaintyValue)
          {
            continue;
          }
        }
        else if (selectedUncertaintyType === "Less Than or Equal to")
        {
          if (uncertaintyFloat >= uncertaintyValue)
          {
            continue;
          }
        }
      }


      let ltFocus = stocks[i]["LongTermFocus"].substring(0,stocks[i]["LongTermFocus"].length-1);
      let longTermFloat = parseFloat(ltFocus);
      if (checkLongTermFocus)
      {
        if (selectedLongTermFocusType === "Greater Than")
          {
            if (longTermFloat <= longTermValue)
            {
              continue;
            }
          }
          else if (selectedLongTermFocusType === "Less Than or Equal to")
          {
            if (longTermFloat >= longTermValue)
            {
              continue;
            }
          }
      }

      

      let stFocus = stocks[i]["ShortTermFocus"].substring(0,stocks[i]["ShortTermFocus"].length-1);
      let shortTermFloat = parseFloat(stFocus);
      if (checkShortTermFocus)
      {
        if (selectedShortTermFocusType === "Greater Than")
          {
            if (shortTermFloat <= shortTermValue)
            {
              continue;
            }
          }
          else if (selectedShortTermFocusType === "Less Than or Equal to")
          {
            if (shortTermFloat >= shortTermValue)
            {
              continue;
            }
          }
      }

      

      let intFocus = stocks[i]["InternalFocus"].substring(0,stocks[i]["InternalFocus"].length-1);
      let internalFloat = parseFloat(intFocus);
      if (checkInternalFocus)
      {
        if (selectedInternalFocusType === "Greater Than")
          {
            if (internalFloat <= internalValue)
            {
              continue;
            }
          }
          else if (selectedInternalFocusType === "Less Than or Equal to")
          {
            if (internalFloat >= internalValue)
            {
              continue;
            }
          }
      }

      

      let extFocus = stocks[i]["ExternalFocus"].substring(0,stocks[i]["ExternalFocus"].length-1);
      let externalFloat = parseFloat(extFocus);
      if (checkExternalFocus)
      {
        if (selectedExternalFocusType === "Greater Than")
          {
            if (externalFloat <= externalValue)
            {
              continue;
            }
          }
          else if (selectedExternalFocusType === "Less Than or Equal to")
          {
            if (externalFloat >= externalValue)
            {
              continue;
            }
          }
      }

      if (portfolio.includes(stocks[i]["Ticker"]))
      {
        continue;
      }
      
     //NEED TO KNOW HOW TO HANDLE DUPLICATE TICKERS IN HERE FROM LOOKBACK PERIOD > 1 QUARTER
      if (selectedDocument !== "ANY" && stocks[i]["FinancialDocumentType"] !== selectedDocument)
      {
        continue;
      }
      
      let dictSize = Object.keys(dict).length;
      //console.log(dictSize);

      

      if (checkAbsolute)
      {
        if (selectedRelative === "Truthful")
          {
            if (stocks[i]["Ticker"] in dict) //Need to add all duplicates to their own array and save this data before even analyzing any of them, so you can look at them in context on whether they are currently a very deceptive investment but only show up because they used to be very truthful
            {
              if (datascore > dict[stocks[i]["Ticker"]])
              {
                console.log("Just replaced ", stocks[i]["Ticker"], " that was previously ", dict[stocks[i]["Ticker"]], " with ", datascore);
                dict[stocks[i]["Ticker"]] = datascore;
                console.log(dict);
              }
            }
            else if (dictSize < parseInt(absoluteValue))
            {
              dict[stocks[i]["Ticker"]] = datascore;
              console.log("Added ", stocks[i]["Ticker"], datascore);
              console.log(dict);
            }
            else 
            {
              let minDataScoreTicker = Object.keys(dict)[0];
              let minDataScore = dict[minDataScoreTicker];
              for (let key in dict)
              {
                if (dict[key] < minDataScore)
                {
                  minDataScore = dict[key];
                  minDataScoreTicker = key;
                }
              }
              if (datascore > minDataScore)
              {
                dict[stocks[i]["Ticker"]] = datascore;
                console.log("Added ", stocks[i]['Ticker'], datascore);
                delete dict[minDataScoreTicker];
                console.log(dict);
                
              }
            }
          }
          else 
          { 
            if (stocks[i]["Ticker"] in dict)
            {
              if (datascore < dict[stocks[i]["Ticker"]])
              {
                console.log("Just replaced ", stocks[i]["Ticker"], " that was previously ", dict[stocks[i]["Ticker"]], " with ", datascore);
                dict[stocks[i]["Ticker"]] = datascore;
              }
            }
            else if (dictSize < parseInt(absoluteValue))
            {
              dict[stocks[i]["Ticker"]] = datascore;
            }
            else 
            {
              let maxDataScoreTicker = Object.keys(dict)[0];
              let maxDataScore = dict[maxDataScoreTicker];
              for (let key in dict)
              {
                if (dict[key] > maxDataScore)
                {
                  maxDataScore = dict[key];
                  maxDataScoreTicker = key;
                }
              }
              if (datascore < maxDataScore)
              {
                delete dict[maxDataScoreTicker];
                dict[stocks[i]["Ticker"]] = datascore;
              }
            }
          }
      }
      else 
      {
        portfolio.push(stocks[i]["Ticker"]);
      }
      
      
      
      //We already have an array of tickers
      //Create an identical array of datascores, sorted ascending order
      
      //portfolio.push(stocks[i]["Ticker"]);
      //console.log(stocks[i]["AbsoluteDate"]);
    }
    if (checkAbsolute)
    {
      if (absoluteDate !== 20080101 && absoluteDate < 20240700 && Object.keys(dict).length === 0)
      {
        alert("No companies found for at least one portfolio rebalancing period. Try again with a new search criteria. " + absoluteDate);
        /* eslint-disable-next-line */
        location.reload();
        return;
      }
      let dscores = [];
      for (let tick in dict)
      {
        portfolio.push(tick);
        dscores.push(dict[tick]);
      }
      console.log(dscores);
    }
    else {
      if (absoluteDate !== 20080101 && absoluteDate < 20240700 && portfolio.length === 0) 
      {
        alert("No companies found for at least one portfolio rebalancing period. Try again with a new search criteria.");
        /* eslint-disable-next-line */
        location.reload();
        return;
      }
    }
    
    console.log(portfolio);
    portfolioHistory[String(absoluteDate)] = portfolio;

    //await invest(portfolio, absoluteDate, lowerDateBoundary);

    
    /*
    for (let key in currPortfolioDictionary)
      {
        if (!(portfolio.includes(key)))
        {
          delete currPortfolioDictionary[key];
        }
      }
      console.log("Portfolio rebalanced on ", absoluteDate, ". Now consists of ", currPortfolioDictionary);
    */
  }
  
  async function searchCompanies() {
    const minPriceRebalancingFrequency = Math.max(parseInt(enterTradeValue), parseInt(exitTradeValue));

    let adjustedPriceRebalancingFrequency;

    if (!checkAbsolute && !checkRelative && !checkPageCount && !checkDeceptiveFragPercent && !checkPositiveFrag && !checkNegativeFrag && !checkYearChange && !checkFinancialUncertainty && !checkLongTermFocus && !checkShortTermFocus && !checkInternalFocus && !checkExternalFocus)
    {
      alert("Must enable at least one search criteria.")
      return;
    }
    else if (selectedIndex !== "S&P 500")
    {
      alert("Only S&P 500 can be selected at this time. ")
      return;
    }
    else if (selectedDocument !== 'ANY' && selectedDocument !== '10-K' && selectedDocument !== '10-Q')
    {
      alert("Only 10-K and 10-Q available at this time.")
      return;
    }
    else if (selectedPriceRebalancingPeriod !== "Trading Days")
    {
      alert("Only trading days can be selected at this time. ");
      return;
    }
    else if (checkAbsolute && maxCompanies < parseInt(absoluteValue))
    {
      alert("You have selected the top " + absoluteValue + " companies, which is more than what is included in the " + selectedIndex + ".");
      return;
    }
    else if (checkAbsolute && isNaN(parseInt(absoluteValue)))
    {
      alert("Enter a number for number of companies in absolute criteria.");
      return;
    }
    else if (checkRelative && (isNaN(parseFloat(relativeValue)) || parseFloat(relativeValue) < -100 || parseFloat(relativeValue) > 100))
    {
      alert("Enter a valid number or decimal for the relative criteria.");
      return;
    }

    setDoneLoading(false);
    console.log("Button Clickled");
    console.log(inputEl["current"]);
    console.log(temp["current"]);
    newPortfolioValue = portfolioValue;
    /*
    let tradingDayOne;
    if (selectedLookback === "1 QUARTER")
      {
        tradingDayOne = "4/1/2008";
      }
    else if (selectedLookback === "1 YEAR")
      {
        tradingDayOne = "1/2/2009";
      }
      else {
        tradingDayOne = "1/4/2010";
      }
    */

      let rebalanceInterval;
      if (selectedRebalancingPeriod === "Monthly")
        {
          rebalanceInterval = 1;
        }
      else if (selectedRebalancingPeriod === "Quarterly")
        {
          rebalanceInterval = 3;
        }
      else if (selectedRebalancingPeriod === "Yearly")
        {
          rebalanceInterval = 12;
        }

      let currmonth = 1;
      let curryear = 2008;
      let currday = 1;
      let absoluteDate = (curryear*10000) + (currmonth*100) + currday;

      let lookbackMonth = 1;
      let lookbackYear = 2008;
      let lookbackDay = 1;

      let lowerDateBoundary;
      if (selectedLookback === "1 QUARTER")
      {
        lookbackMonth-=3;
      }
      else if (selectedLookback === "2 QUARTERS")
      {
        lookbackMonth-=6;
      }
      else if (selectedLookback === "3 QUARTERS")
      {
        lookbackMonth -= 9;
      }
      else {
        lookbackMonth -= 12;
      }


      if(lookbackMonth < 1)
      {
        lookbackYear -= 1;
        lookbackMonth = lookbackMonth + 12;
      }
      lowerDateBoundary = (lookbackYear*10000) + (lookbackMonth*100) + lookbackDay;
      
      
      //console.log(rebalanceInterval);
      //console.log(absoluteDate);
      //console.log(lowerDateBoundary);
      //use ge for lower boundary
      
      
      while (absoluteDate < 20250100)
      {
        await getData(absoluteDate, lowerDateBoundary);
        //FETCH
        if (rebalanceInterval === 1)
        {
          currmonth += 1;
        }
        else if (rebalanceInterval === 3)
        {
          currmonth += 3;
        }
        else if (rebalanceInterval === 12)
        {
          currmonth += 12;
        }

        if (currmonth > 12)
        {
          curryear += 1;
          currmonth = (currmonth - 12);
        }
        absoluteDate = (curryear*10000) + (currmonth*100) + currday;
        lookbackYear = curryear;
        if (selectedLookback === "1 QUARTER")
        {
          lookbackMonth = currmonth - 3;          
        }
        else if (selectedLookback === "2 QUARTERS")
        {
          lookbackMonth = currmonth - 6;
        }
        else if (selectedLookback === "3 QUARTERS")
        {
          lookbackMonth = currmonth - 9;
        }
        else if (selectedLookback === "1 YEAR")
        {
          lookbackMonth = currmonth - 12;
        }

        if (lookbackMonth < 1)
        {
          lookbackYear = curryear - 1 ;
          lookbackMonth = lookbackMonth + 12;
        }
        lowerDateBoundary = (lookbackYear*10000) + (lookbackMonth*100) + lookbackDay;
        //console.log("Portfolio rebalanced on ", absoluteDate, " looking back to ", lowerDateBoundary);


        /*
        absoluteDate = dateBoundary;
        if (rebalanceInterval === 1)
        {
          if (month === 12)
          {
            month = 1;
            year+=1;
          }
          else{
            month+=1;
          }
        }
          else if (rebalanceInterval === 3)
          {
            month += 3;
            if (month > 9)
            {
              year += 1;
              month = month % 12;
            }
          }
          else if (rebalanceInterval === 12)
          {
            year += 1
          }
          dateBoundary = (year*10000) + (month*100) + day;
          console.log("Portfolio for ", absoluteDate, " until ", dateBoundary);
          */
      }
      //console.log("Portfolio history: ", portfolioHistory);
      console.log(rebalanceHistoryShares);

      for (let key in portfolioHistory)
      {
        if (portfolioHistory[key].length === 0)
        {
          delete portfolioHistory[key]
        }
      }

      setDetailedPortfolio(portfolioHistory);
      console.log(portfolioHistory);
      setCompaniesFound(true);
      setDoneLoading(true);
      setOpen(true);
      const cmpFoundTime = new Date();
      let minutes = parseInt(cmpFoundTime.getMinutes());
      if (minutes < 10)
      {
        minutes = "0" + String(minutes);
      }
      setCompaniesFoundTimeStamp(String(cmpFoundTime.getHours()) + ":" + String(minutes));
  }
  
  async function createTearSheet(dataHis, sandpHis, sandpEqualWeightHis)
  {
    let spyAnnReturns = {};
    let dATAAnnReturns = {};
    let spyEqAnnReturns = {};

    const calculateSTD = (arr) => {
      const mean = arr.reduce((sum, value) => sum + value, 0) / arr.length;
      const squareDiffs = arr.map(value => {
        const diff = value - mean;
        return diff * diff;
      });
      const avgSquareDiff = squareDiffs.reduce((sum, value) => sum + value, 0) / arr.length;
      const standardDeviation = Math.sqrt(avgSquareDiff);
      return standardDeviation;
    }

    function generateAnnualReturns(data,index){
      
      let yr = 2009;
      let month = 1;
      let day = 1;

      let dt = (yr*10000)+(month*100)+(day);
      let annualReturns = {};
      
      let totalNumYears = 16;
      for (let i = 0; i < totalNumYears; i++) //16 years of data
      {
        month = 1;
        
        day = 1;
        dt = (yr*10000) + (month*100)+(day);
        let foundStart = false;
        let foundEnd = false;

        let startingValue;
        let endingValue;

        while (!foundStart)
        {
          if (!(dt in data))
          {
            day+=1;
            dt = (yr*10000)+(month*100)+(day);
          }
          else 
          {
            foundStart = true;
            startingValue = data[dt];
          }
        }

        let endDt = (yr * 10000) + (12 * 100) + 31;
        if (yr === 2024)
        {
          endDt = (yr * 10000) + (6 * 100) + 31;
        }
        while (!foundEnd)
        {
          if (!(endDt in data))
          {
            endDt-=1;
          }
          else 
          {
            foundEnd = true;
            endingValue = data[endDt];
          }
        }
        let growthRate = ((endingValue-startingValue)/startingValue)*100;
        //console.log("Started: ", startingValue, ". Ended: ", endingValue, ". Profit: ", endingValue-startingValue);
        console.log("Growth in ", yr, ": ", growthRate, "%");
        annualReturns[yr] = growthRate;
        yr = yr + 1;
      }
      console.log(annualReturns);
      if (index === 0)
      {
        dATAAnnReturns = annualReturns;
        setDATAAnnualReturns(annualReturns);
      }
      else if (index === 1)
      {
        spyAnnReturns = annualReturns;
        setSPYAnnualReturns(annualReturns);
      }
      else 
      {
        spyEqAnnReturns = annualReturns;
        setSPYEqAnnualReturns(annualReturns);
      }
      console.log("Done");
    }

   generateAnnualReturns(dataHis, 0);
   generateAnnualReturns(sandpHis, 1);
   generateAnnualReturns(sandpEqualWeightHis, 2);

   let DATAPortfolioValues = Object.values(dataHis);
   let DATAPortfolioFinalValue = DATAPortfolioValues[DATAPortfolioValues.length-1];
   console.log(DATAPortfolioFinalValue);

   let DATATotalReturn = (DATAPortfolioFinalValue/(portfolioValue/1000))*100;
   console.log(DATATotalReturn);
   setDataReturn(DATATotalReturn);

   let DATAcagr = ((Math.pow((DATAPortfolioFinalValue/(portfolioValue/1000)),1/15.5))-1)*100
   console.log("CAGR: ",DATAcagr,"%");
   setDataCAGR(DATAcagr);

   let SANDPPortfolioValues = Object.values(sandpHis);
   let SANDPPortfolioFinalValue = SANDPPortfolioValues[SANDPPortfolioValues.length-1];
   console.log(SANDPPortfolioFinalValue);

   let SANDPTotalReturn = (SANDPPortfolioFinalValue/(portfolioValue/1000))*100;
   console.log(SANDPTotalReturn);
   setSpyReturn(SANDPTotalReturn);

   let SANDPcagr = ((Math.pow((SANDPPortfolioFinalValue/(portfolioValue/1000)),1/15.5))-1)*100
   console.log("CAGR: ",SANDPcagr,"%");
   setSpyCAGR(SANDPcagr);

   let SANDPEqPortfolioValues = Object.values(sandpEqualWeightHis);
   let SANDPEqPortfolioFinalValue = SANDPEqPortfolioValues[SANDPEqPortfolioValues.length-1];
   console.log(SANDPEqPortfolioFinalValue);

   let SANDPEqTotalReturn = (SANDPEqPortfolioFinalValue/(portfolioValue/1000))*100;
   console.log(SANDPEqTotalReturn);
   setSpyEqReturn(SANDPEqTotalReturn);

   let SANDPEqcagr = ((Math.pow((SANDPEqPortfolioFinalValue/(portfolioValue/1000)),1/15.5))-1)*100
   console.log("CAGR: ",SANDPEqcagr,"%");
   setSpyeqCAGR(SANDPEqcagr);

   console.log(dATAAnnReturns);
   console.log(spyAnnReturns);
   console.log(spyEqAnnReturns);

   //Calculate excess annual returns
   let yrs = Object.keys(dATAAnnReturns);
   let dataAnnReturnsValues = Object.values(dATAAnnReturns);
   let spyAnnReturnsValues = Object.values(spyAnnReturns);

   let excessReturns = {};

   for (let p = 0; p < yrs.length; p++)
   {
      let excessReturn = dataAnnReturnsValues[p] - spyAnnReturnsValues[p];
      excessReturns[yrs[p]] = excessReturn;
   }

   console.log("Excess Returns: ", excessReturns);
   setExcessReturn(excessReturns);
   
  }

  async function generateReturns()
  {
    //Adjusted rebalance frequency


    let runningPortfolioValue = portfolioValue;

    let indexedDateKeys = Object.keys(portfolioPriceBookDateIndexed);
    let rebalanceDates = Object.keys(portfolioPriceBook);

    let rebalanceCounter = 0;

    let portfolioSharesBook = {};
    let portfolioHistoryBook = {};
    

    console.log(rebalanceDates[0]);
    console.log(indexedDateKeys[0]);

    let resumeDate;
    for (let i = 0; i < indexedDateKeys.length; i++)
    {
      let currPortfolioTickers = [];
      for (let j = 0; j < portfolioPriceBookDateIndexed[indexedDateKeys[i]].length; j++)
      {
        currPortfolioTickers.push(portfolioPriceBookDateIndexed[indexedDateKeys[i]][j]["Ticker"]);
      }
      //console.log(currPortfolioTickers);
      //console.log(portfolioSharesBook);
      

      if (rebalanceDates.includes(indexedDateKeys[i])) //We have to rebalance for portfolio composition
      {
        for (let key in portfolioSharesBook)
        {
          if (!(currPortfolioTickers.includes(key)))
          {
            delete portfolioSharesBook[key];
            console.log("deleted ", key, " from shares book");
          }
        }
        let numEquities = portfolioPriceBookDateIndexed[indexedDateKeys[i]].length;
        let holdingPerEquity = runningPortfolioValue/numEquities;
        for (let j = 0; j < portfolioPriceBookDateIndexed[indexedDateKeys[i]].length; j++)
        {
          let tickerName = portfolioPriceBookDateIndexed[indexedDateKeys[i]][j]["Ticker"];
          if (!(tickerName in portfolioSharesBook))
          {
            portfolioSharesBook[tickerName] = 0;
          }

          let currShares = portfolioSharesBook[tickerName];
          let currPrice = portfolioPriceBookDateIndexed[indexedDateKeys[i]][j]["Close"];

          let currValHolding = currShares * currPrice;

          let buySellNull = "BUY";
          if (currValHolding < holdingPerEquity) //Need to buy more shares
          {
            let amountToBuy = holdingPerEquity - currValHolding;
            let buyPrice;
            if (selectedTradingCostType === "Dollars Per Share")
            {
              buyPrice = portfolioPriceBook[indexedDateKeys[i]][j]["Buy"]+parseFloat(tradingCosts);
            }
            else 
            {
              buyPrice = portfolioPriceBook[indexedDateKeys[i]][j]["Buy"]+(((parseFloat(tradingCosts))/100)*portfolioPriceBook[indexedDateKeys[i]][j]["Buy"]);
            }
            
            let sharesToBuy = Math.floor(amountToBuy/buyPrice);
            portfolioSharesBook[tickerName] = sharesToBuy + portfolioSharesBook[tickerName];
            if (sharesToBuy == 0)
            {
              if (i != indexedDateKeys.length-1)
              {
                resumeDate = indexedDateKeys[i+1];
              }
              buySellNull = "NULL";
            }
            else
            {
              resumeDate = parseInt(portfolioPriceBook[indexedDateKeys[i]][j]["RebalanceBuyDate"].replace(/-/g, ''),10);
            }
            //console.log(equity["Ticker"], ": Currently have ", initialShares, " worth ", currValueOfHolding, ". We want to buy ", sharesToBuy, " shares each for ", equity["Buy"], " to purchase ", amountToBuy, " worth of shares. Now our holding is ", holdingPerEquity, " with " ,portfolioSharesBook[equity["Ticker"]], " shares. This period ends with price of ", equity["End"]);
          }
          else if (currValHolding > holdingPerEquity) //Need to sell more shares
          {
            let amountToSell = currValHolding - holdingPerEquity;
            let sellPrice;
            if (selectedTradingCostType === "Dollars Per Share")
            {
              sellPrice = portfolioPriceBook[indexedDateKeys[i]][j]["Sell"]-parseFloat(tradingCosts);
            }
            else 
            {
              sellPrice = portfolioPriceBook[indexedDateKeys[i]][j]["Sell"]-(((parseFloat(tradingCosts))/100)*portfolioPriceBook[indexedDateKeys[i]][j]["Sell"]);
            }
            
            let sharesToSell = Math.floor(amountToSell/sellPrice);
            portfolioSharesBook[tickerName] = portfolioSharesBook[tickerName] - sharesToSell;
            if (sharesToSell == 0)
            {
              if (i != indexedDateKeys.length-1)
              {
                resumeDate = indexedDateKeys[i+1];
              }
              buySellNull = "NULL";
            }
            else 
            {
              buySellNull = "SELL";
              resumeDate = parseInt(portfolioPriceBook[indexedDateKeys[i]][j]["RebalanceExitDate"].replace(/-/g, ''),10);
            }
          }
          else { 
            buySellNull = "NULL"; //No need to buy or sell
            if (i != indexedDateKeys.length-1)
            {
              resumeDate = indexedDateKeys[i+1];
            }
          }
          //console.log(portfolioSharesBook);
        }


        rebalanceCounter = 0;
      }
      else //Check to see if must balance for price
      {
        if (indexedDateKeys[i] < resumeDate) //Skip forward to when purchasing or selling has been completed
        {
          continue;
        }
        else 
        {
          //Assume rebalancing every 7 days (CHANGE TO USER INPUT)
          //Assume that days to enter and exit trade are both smaller than the frequency at which you rebalance for price
          if (rebalanceCounter === parseInt(priceRebalancingFrequency["current"])) //Rebalance
          {
            rebalanceCounter = 0; 
            let newPortValue = 0;

            let numStockOnDay = portfolioPriceBookDateIndexed[indexedDateKeys[i]].length;
            let sub = 0;

            for (let j = 0; j < numStockOnDay; j++)
            {
              let tickerName = portfolioPriceBookDateIndexed[indexedDateKeys[i]][j]["Ticker"];
              if (!(tickerName in portfolioSharesBook))
              {
                let msg = "Stock history data for " + tickerName + " is incomplete on " + indexedDateKeys[i] + " and was removed from the portfolio";
                setAlertMessages([
                  ...alertMessages,
                  msg
                ]);
                alertID+=1;
                sub++;
                continue;
              }
              let numShares = portfolioSharesBook[tickerName];
              let price = portfolioPriceBookDateIndexed[indexedDateKeys[i]][j]["Close"]; 
              let currValOfHolding = price * numShares;
              newPortValue += currValOfHolding;
              console.log(numShares, " of ", tickerName, " is worth ", currValOfHolding)
            }
            numStockOnDay = numStockOnDay - sub;

            runningPortfolioValue = newPortValue;
            console.log("portfolio worth ", newPortValue);
            portfolioHistoryBook[indexedDateKeys[i]] = newPortValue/1000;
            let expectedHoldingPerEquity = runningPortfolioValue/numStockOnDay;
            for (let j = 0; j < numStockOnDay;j++)
            {
              let tickerName = portfolioPriceBookDateIndexed[indexedDateKeys[i]][j]["Ticker"];
              let numShares = portfolioSharesBook[tickerName];
              let price = portfolioPriceBookDateIndexed[indexedDateKeys[i]][j]["Close"]; 
              let currValOfHolding = price * numShares;
              if (currValOfHolding > expectedHoldingPerEquity) //Sell to rebalance
              {
                let sellAmount = currValOfHolding - expectedHoldingPerEquity;
                let sharesSold;
                if (selectedTradingCostType === "Dollars Per Share")
                {
                  sharesSold = sellAmount/(price-parseFloat(tradingCosts));
                }
                else 
                {
                  sharesSold = sellAmount/(price-(((parseFloat(tradingCosts))/100)*price))
                }

                portfolioSharesBook[tickerName] = portfolioSharesBook[tickerName] - sharesSold;
              }
              else if (currValOfHolding < expectedHoldingPerEquity) //Buy to rebalance
              {
                let buyAmount = expectedHoldingPerEquity - currValOfHolding;
                let sharesBuy;
                if (selectedTradingCostType === "Dollars Per Share")
                {
                  sharesBuy = buyAmount/(price+parseFloat(tradingCosts));
                }
                else 
                {
                  sharesBuy = buyAmount/(price+(((parseFloat(tradingCosts))/100)*price));
                }

                portfolioSharesBook[tickerName] = portfolioSharesBook[tickerName] + sharesBuy;
              }
            }
          }
          else 
          {
            let numStockOnDay = portfolioPriceBookDateIndexed[indexedDateKeys[i]].length;
            let newPortValue=0;
            for (let j = 0; j < numStockOnDay; j++)
            {
              let tickerName = portfolioPriceBookDateIndexed[indexedDateKeys[i]][j]["Ticker"];
              if (!(tickerName in portfolioSharesBook))
              {
                continue;
              }
              let numShares = portfolioSharesBook[tickerName];
              let price = portfolioPriceBookDateIndexed[indexedDateKeys[i]][j]["Close"];
              newPortValue += price * numShares;
            }
            portfolioHistoryBook[indexedDateKeys[i]] = newPortValue/1000;
            rebalanceCounter += 1;
          }
        }
      }
      
    }
    console.log(portfolioHistoryBook);
    setFullHistory(portfolioHistoryBook);
    let portfolioDates = Object.keys(portfolioHistoryBook);
    let formattedDates = [];

    let numSpyShares = Math.floor(portfolioValue/data[portfolioDates[0]]);
    let numEqSpyShares = Math.floor(portfolioValue/eqdata[portfolioDates[0]]);
    let spyData = [];
    let spyEqData = [];
    let spyDataDict = {};
    let spyEqDataDict = {};
    let riskFreeData = [];
    for (let k = 0; k < portfolioDates.length; k++)
    {
      let dateStr = portfolioDates[k];
      let year = dateStr.slice(0,4);
      let month = dateStr.slice(4,6);
      let day = dateStr.slice(6,8);
      formattedDates.push(new Date(year+'-'+month+'-'+day));
      spyData.push((parseFloat(data[portfolioDates[k]])*numSpyShares)/1000);
      spyEqData.push((parseFloat(eqdata[portfolioDates[k]])*numEqSpyShares)/1000);
      spyDataDict[dateStr] = parseFloat(data[portfolioDates[k]]);
      spyEqDataDict[dateStr] = parseFloat(eqdata[portfolioDates[k]]);
      riskFreeData.push((parseFloat(risk_free_data[portfolioDates[k]]) * numEqSpyShares)/1000)
      //console.log(portfolioDates[k], (data[portfolioDates[k]]*numSpyShares)/1000)
    }
    //console.log(spyEqData);
    //console.log(spyData);
    //console.log(formattedDates.length, Object.values(portfolioHistoryBook).length, spyData.length, spyEqData.length);
    console.log(spyDataDict);
    console.log(spyEqDataDict);
    console.log(portfolioHistoryBook);
    console.log(riskFreeData);
    displayData(formattedDates, Object.values(portfolioHistoryBook), spyData, spyEqData);

    let spyDataHistoryBook = {};
    let spyEqDataHistoryBook = {};
    
    for (let l = 0; l < spyData.length; l++)
    {
      spyDataHistoryBook[Object.keys(portfolioHistoryBook)[l]] = spyData[l];
      spyEqDataHistoryBook[Object.keys(portfolioHistoryBook)[l]] = spyEqData[l];
    }
    console.log(spyDataHistoryBook);
    console.log(spyEqDataHistoryBook);
    await createTearSheet(portfolioHistoryBook, spyDataHistoryBook, spyEqDataHistoryBook);
    
    /*
    let priceBookKeys = Object.keys(portfolioPriceBook);

    let portfolioKeys = Object.keys(detailedPortfolio);
    
    let portfolioSharesBook = {};
    let portfolioHistoryBook = {};
    //console.log(portfolioSharesBook["AMGN"]);
    for (let i = 0; i < portfolioKeys.length; i++)
    {
      if (detailedPortfolio[portfolioKeys[i]].length == 0)
      {
        continue;
      }
      let newBookValue = 0;
      let currPortfolioTickers = [];
      for (let j = 0; j < portfolioPriceBook[priceBookKeys[i]].length; j++)
      {
        currPortfolioTickers.push(portfolioPriceBook[priceBookKeys[i]][j]["Ticker"]);
      }
      for (let key in portfolioSharesBook)
      {
        if (!(currPortfolioTickers.includes(key)))
        {
          delete portfolioSharesBook[key];
        }
      }

      let holdingPerEquity = runningPortfolioValue/portfolioPriceBook[priceBookKeys[i]].length;
      for (let j = 0; j < portfolioPriceBook[priceBookKeys[i]].length; j++)
      {
        let BUYING = true;

        let equity = portfolioPriceBook[priceBookKeys[i]][j];
        if (!(equity["Ticker"] in portfolioSharesBook))
        {
          portfolioSharesBook[equity["Ticker"]] = 0;
        }
        
        let currValueOfHolding = portfolioSharesBook[equity["Ticker"]] * equity["Start"];
        let initialShares = portfolioSharesBook[equity["Ticker"]];
        if (currValueOfHolding < holdingPerEquity) //Need to buy more shares
        {
          let amountToBuy = holdingPerEquity - currValueOfHolding;
          let sharesToBuy = Math.floor(amountToBuy/equity["Buy"]);
          portfolioSharesBook[equity["Ticker"]] = sharesToBuy + portfolioSharesBook[equity["Ticker"]];
          console.log(equity["Ticker"], ": Currently have ", initialShares, " worth ", currValueOfHolding, ". We want to buy ", sharesToBuy, " shares each for ", equity["Buy"], " to purchase ", amountToBuy, " worth of shares. Now our holding is ", holdingPerEquity, " with " ,portfolioSharesBook[equity["Ticker"]], " shares. This period ends with price of ", equity["End"]);
          //console.log(equity["Ticker"], portfolioSharesBook[equity["Ticker"]], equity["Buy"], currValueOfHolding, amountToBuy, sharesToBuy);
        }
        else if (currValueOfHolding > holdingPerEquity) //Need to sell more shares
        {
          let amountToSell = currValueOfHolding - holdingPerEquity;
          let sharesToSell = Math.floor(amountToSell/equity["Sell"]);
          portfolioSharesBook[equity["Ticker"]] = portfolioSharesBook[equity["Ticker"]] - sharesToSell;
          //console.log(equity["Ticker"], portfolioSharesBook[equity["Ticker"]], equity["Sell"], currValueOfHolding, amountToSell, sharesToSell);
          console.log(equity["Ticker"], ": Currently have ", initialShares, " worth ", currValueOfHolding, ". We want to sell ", sharesToSell, " shares each for ", equity["Sell"], " to sell ", amountToSell, " worth of shares. Now our holding is ", holdingPerEquity, " with " ,portfolioSharesBook[equity["Ticker"]], " shares. This period ends with price of ", equity["End"]);
          BUYING = false;
        }
        //let stockDataForRebalancingPeriod = portfolioPriceBookFull[portfolioKeys[i]][j];
        //Rebalance every 2 days
        let dayOneIndex;
        if (BUYING)
        {
          dayOneIndex = parseInt(enterTradeValue);
        }
        else 
        {
          dayOneIndex = parseInt(exitTradeValue);
        }


        //Price rebalancing goes here
        newBookValue += equity["End"] * portfolioSharesBook[equity["Ticker"]];
        
      }
      //console.log(newBookValue);
      //let eDate = portfolioPriceBook[priceBookKeys[i]][0];
      //console.log(eDate);
      //console.log(portfolioPriceBook[priceBookKeys[i]][0]["EndDate"]);
      //portfolioHistoryBook[portfolioPriceBook[priceBookKeys[i]][0]["EndDate"]] = newBookValue;
      runningPortfolioValue = parseFloat(newBookValue);
      portfolioHistoryBook[portfolioPriceBook[priceBookKeys[i]][0]["EndDate"]] = parseFloat(newBookValue);
      //portfolioHistoryBook[] = parseFloat(newBookValue);
    }
    console.log(portfolioHistoryBook);
    displayData(Object.keys(portfolioHistoryBook), Object.values(portfolioHistoryBook));
    */
  }

  async function createReturns()
  {
    const minPriceRebalancingFrequency = Math.max(parseInt(enterTradeValue), parseInt(exitTradeValue));
    //Get percentage returns from start to finish of each equity
    //console.log(detailedPortfolio)
    if (isNaN(parseInt(priceRebalancingFrequency["current"])))
    {
      alert("Enter a number for price rebalancing period");
      return;
    }
    else if (isNaN(parseFloat(tradingCosts)))
    {
      alert("Enter a number for trading costs");
      return;
    }
    else if (selectedTradingCostType === "% of Share" && (tradingCosts < 0 || tradingCosts > 100))
    {
      alert("Enter a number within range for trading cost");
      return;
    }
    else if (selectedTradingCostType === "Dollars Per Share" && (tradingCosts < 0))
    {
      alert("Enter a number within range for trading cost");
      return;
    }
    else if (isNaN(parseInt(lagValue)))
    {
      alert("Enter a number for trading lag period");
      return;
    }
    else if (isNaN(parseInt(enterTradeValue)))
    {
      alert("Enter a number for trading lag period");
      return;
    }
    else if (isNaN(parseInt(exitTradeValue)))
    {
      alert("Enter a number for trading lag period");
      return;
    }
    else if (parseInt(priceRebalancingFrequency["current"]) < minPriceRebalancingFrequency) {
      alert("Price rebalancing frequency must be greater than both the days to enter a trade and the days to exit a trade.");
      return;
    }
    else if(parseInt(lagValue) < 0 || parseInt(lagValue) > 59)
    {
      alert("Choose a trading lag period within range of the indicated bounds.")
      return;
    }
    else if(isNaN(parseFloat(portfolioValue)))
    {
      alert("Enter a valid amount for portfolio AUM.");
      return;
    }

    setDoneLoading(false);
    const keys = Object.keys(detailedPortfolio);
    for (let j = 0; j < keys.length; j++)
    {
      let portfolioObject = [];

      let fullPriceObject = [];

      let dateStr = keys[j].toString();
      let yearLag = parseInt(dateStr.slice(0,4));
      let monthLag = parseInt(dateStr.slice(4,6));
      let dayLag = parseInt(dateStr.slice(6,8));

      let boundary = 31;
      if (monthLag === 4 || monthLag === 6 || monthLag === 9 || monthLag === 11) //Months with 30 days
      {
        boundary = 30;
      }
      else if (monthLag === 2) //Month is february
      {
        boundary = 28;
      }

      if (dayLag + parseInt(lagValue) > boundary)
      {
        if (monthLag === 12)
        {
          monthLag = 1;
          yearLag += 1;
        }
        else 
        {
          monthLag += 1;
        }
        dayLag = (dayLag+parseInt(lagValue)) - 30;
      }
      else {
        dayLag += parseInt(lagValue);
      }

      let lowerBoundaryWithLag = (yearLag * 10000) + (monthLag * 100) + (dayLag);

      let dayOne;
      for (let i = 0; i < detailedPortfolio[keys[j]].length; i++)
      {
        let upperBoundary;
        let dateStrLag;
        if (j != keys.length - 1)
        {
          upperBoundary = keys[j+1];


          dateStrLag = keys[j+1].toString();

          
          //console.log(detailedPortfolio[key][i]);
        }
        else 
        {
          upperBoundary = 20250101;

          let currDate = keys[j].toString();
          let adjYear = parseInt(currDate.slice(0,4));
          let adjMonth = parseInt(currDate.slice(4,6));
          let adjDay = parseInt(currDate.slice(6,8));

          if (selectedRebalancingPeriod === "Yearly")
          {
            adjYear += 1;
          }
          else 
          {
            if (selectedRebalancingPeriod === "Monthly")
            {
              adjMonth += 1;
            }
            else if (selectedRebalancingPeriod === "Quarterly")
            {
              adjMonth += 3;
            }

            if (adjMonth > 12)
            {
              adjYear += 1;
              adjMonth = adjMonth - 12;
            }
          }

          dateStrLag = ((adjYear*10000) + (adjMonth*100) + (adjDay)).toString();
          
          //dateStrLag = keys
        }
        try {
          
          let upperYearLag = parseInt(dateStrLag.slice(0,4));
          let upperMonthLag = parseInt(dateStrLag.slice(4,6));
          let upperDayLag = parseInt(dateStrLag.slice(6,8));

          let boundaryU = 31;
          if (upperMonthLag === 4 || upperMonthLag === 6 || upperMonthLag === 9 || upperMonthLag === 11) //Months with 30 days
          {
            boundaryU = 30;
          }
          else if (upperMonthLag === 2) //Month is february
          {
            boundaryU = 28;
          }

          if (upperDayLag + parseInt(lagValue) > boundaryU)
          {
            if (upperMonthLag === 12)
            {
              upperMonthLag = 1;
              upperYearLag += 1;
            }
            else 
            {
              upperMonthLag += 1;
            }
            upperDayLag = (upperDayLag+parseInt(lagValue)) - 30;
          }
          else {
            upperDayLag += parseInt(lagValue);
          }

          let upperBoundaryWithLag = (upperYearLag * 10000) + (upperMonthLag * 100) + (upperDayLag);

          
          console.log(lowerBoundaryWithLag, upperBoundaryWithLag);

          const endpoint = `/data-api/rest/History?$filter=Ticker eq '${detailedPortfolio[keys[j]][i]}' and AbsoluteDate lt ${upperBoundaryWithLag} and AbsoluteDate ge ${lowerBoundaryWithLag}`;
          const response = await fetch(`${endpoint}`);
          const result = await response.json();

          const buySellData = result.value;
          dayOne = parseInt(buySellData[0]["Date"].replace(/-/g, ''),10);
          let comp = buySellData[0]["Ticker"];
          for (let k = 0; k < buySellData.length; k++)
          {
            let absDate = parseInt(buySellData[k]["Date"].replace(/-/g, ''),10);
      
            if (!(absDate in portfolioPriceBookDateIndexed))
            {
              portfolioPriceBookDateIndexed[absDate] = [
                {
                  Ticker: comp,
                  Close: buySellData[k]["Close"]
                }
              ];
            }
            else 
            {
              portfolioPriceBookDateIndexed[absDate].push(
                {
                  Ticker: comp, 
                  Close: buySellData[k]["Close"]
                }
              );
            }
          }

          fullPriceObject.push(buySellData);
          


          let buySum = 0;
          for (let k = 0; k < enterTradeValue; k++)
          {
            buySum += buySellData[k]["Close"];
          }
          let avgBuyPrice = buySum/enterTradeValue;

          let sellSum = 0;
          for (let k = 0; k < exitTradeValue; k++)
          {
            sellSum += buySellData[k]["Close"]
          }
          let avgSellPrice = sellSum/exitTradeValue;


          /*

          2009 lookback until 20081001
          Lag is 10 days
          Rebalance on 2009 + 10 days until 2010 + 10 days          

          */

          let finalPriceInPeriod = buySellData[buySellData.length-1]["Close"];
          console.log(buySellData);
          console.log("First day of rebalancing: ", buySellData[0]["Date"], ". If buying shares, rebalancing done on ", buySellData[enterTradeValue]["Date"], " after ", enterTradeValue, " days", ". If selling shares, rebalancing done on ", buySellData[exitTradeValue]["Date"], " after ", exitTradeValue, " days");

          //console.log(buySellData[0]["Ticker"], ": Buy for ", avgBuyPrice, " across ", enterTradeValue, " days.");
          //console.log(buySellData[0]["Ticker"], ": Sell for ", avgSellPrice, " across ", enterTradeValue, " days.");
          //console.log(buySellData[0]["Ticker"], ": Final price ", finalPriceInPeriod);
          //console.table(result.value);

          portfolioObject.push({
              Buy: avgBuyPrice,
              Sell: avgSellPrice, 
              Start: buySellData[0]["Close"],
              End: finalPriceInPeriod,
              Ticker: buySellData[0]["Ticker"],
              EndDate: buySellData[buySellData.length-1]["Date"],
              RebalanceBuyDate: buySellData[enterTradeValue]["Date"],
              RebalanceExitDate: buySellData[exitTradeValue]["Date"]
          });
        }
        catch(err){
          console.log(detailedPortfolio[keys[j]][i], " close price not found");
        }
        //console.log(portfolioObject);
        
       
      } 
      portfolioPriceBookFull[keys[j]] = fullPriceObject;
      portfolioPriceBook[dayOne] = portfolioObject;
    }

    console.log(portfolioPriceBook);
    //console.log(portfolioPriceBookFull);
    console.log(portfolioPriceBookDateIndexed);

    await generateReturns();

    console.log(benchmarkData);
    console.log(benchmarkDataEqualWeight);
    setDoneLoading(true);
    setOpen(true);
    setReturnsGenerated(true);
    const bktstFoundTime = new Date();
    let minutes = bktstFoundTime.getMinutes();
    if (minutes < 10)
    {
      minutes = "0" + String(minutes);
    }
    setBacktestCompleteTimeStamp(String(bktstFoundTime.getHours()) + ":" + String(minutes));

    //await createTearSheet();
  }



  const saveCriteriaCSV = (obj, head) => {
    const headers = head;
    const rows = Object.entries(obj);

    let csvContent = headers.join(',') + '\n'; // Add headers
    rows.forEach(([key, value]) => {
      csvContent += `${key},${value}\n`; // Add each row
    });

    return csvContent;
  };

  function saveCriteria() {
    let absoluteSaved;
    if (!checkAbsolute) {
      absoluteSaved = "DISABLED";
    } else { absoluteSaved = "Top " + absoluteValue + " most " + selectedRelative + " companies"; }

    let relativeSaved;
    if (!checkRelative) {
      relativeSaved = "DISABLED";
    } else { relativeSaved = "DATA Score " + selectedRelativeCriteria + " " + relativeValue; }

    let pgCount;
    if (!checkPageCount) {
      pgCount = "DISABLED";
    } else { pgCount = selectedPageCount + " " + pageCountValue + " pages"; }

    let dfPercent;
    if (!checkDeceptiveFragPercent) {
      dfPercent = "DISABLED";
    } else { dfPercent = selectedComparison + " " + sliderValue + "%"; }

    let posFrag;
    if (!checkPositiveFrag) {
      posFrag = "DISABLED";
    } else { posFrag = selectedPositiveComparison + " " + positiveSliderValue + "%"; }

    let negFrag;
    if (!checkNegativeFrag) {
      negFrag = "DISABLED";
    } else { negFrag = selectedNegativeComparison + " " + negativeSliderValue + "%"; }

    let yChange;
    if (!checkYearChange) {
      yChange = "DISABLED";
    } else { yChange = selectedChangeType + " " + changeYearSliderValue + "%"; }

    let fUncert;
    if (!checkFinancialUncertainty) {
      fUncert = "DISABLED";
    } else { fUncert = selectedUncertaintyType + " " + uncertaintyValue + "%"; }

    let ltF;
    if (!checkLongTermFocus) {
      ltF = "DISABLED";
    } else { ltF = selectedLongTermFocusType + " " + longTermValue + "%"; }

    let stF;
    if (!checkShortTermFocus) {
      stF = "DISABLED";
    } else { stF = selectedShortTermFocusType + " " + shortTermValue + "%"; }

    let iFocus;
    if (!checkInternalFocus) {
      iFocus = "DISABLED";
    } else { iFocus = selectedInternalFocusType + " " + internalValue + "%"; }

    let eFocus;
    if (!checkExternalFocus) {
      eFocus = "DISABLED";
    } else { eFocus = selectedExternalFocusType + " " + externalValue + "%"; }

    const criteriaContent = {
      "Stock Index": selectedIndex,
      "Lookback Period": selectedLookback,
      "Document Type": selectedDocument,
      "Portfolio Rebalancing Period": selectedRebalancingPeriod,
      "Price Rebalancing Period": "Every " + priceRebalancingFrequency + " " + selectedPriceRebalancingPeriod,
      "Absolute Criteria": absoluteSaved,
      "Relative Criteria": relativeSaved,
      "Page Count": pgCount,
      "Deceptive Frag %": dfPercent,
      "Positive Frag Avg DATA Score": posFrag,
      "Negative Frag Avg DATA Score": negFrag,
      "Year on Year Change": yChange,
      "Financial Uncertainty": fUncert, 
      "Long Term Focus": ltF, 
      "Short Term Focus": stF,
      "Internal Focus": iFocus, 
      "External Focus": eFocus,
      "Trading Lag Period": lagValue,
      "Number of Days to Enter Trade": enterTradeValue,
      "Number of Days to Exit Trade": exitTradeValue, 
      "Portfolio AUM": "$"+assetsUnderManagement, 
      "Trading Costs": tradingCosts + " " + selectedTradingCostType
    }

    function load(file, header, name) {
      const csvContent = saveCriteriaCSV(file, header);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name+'.csv'); // Set the download file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Cleanup the DOM
    }

    let docTitle;
    const dt = new Date();
    const currDate = String(dt.getFullYear())+'-'+String(dt.getMonth())+'-'+String(dt.getDate())+'_'+String(dt.getHours())+';'+String(dt.getMinutes())+';'+String(dt.getSeconds());
    if (backtestName !== undefined)
    {

      docTitle = backtestName.replace(/ /g, "_") + '_' + currDate;
    } else {
      docTitle = currDate;
    }

    load(criteriaContent, ['Criteria', 'Value'], docTitle + '_saved_criteria');
    load(detailedPortfolio, ['First Date of Portfolio', 'Companies'], docTitle + '_portfolio_composition_history');
    
  }
  /* 
  function searchCompanies()
  {

    let companyBucket = [];
    //First find all possible companies that match
    //Then can input time series data and you can search stock price history based off of this
    
    let errorFlag = false;
    if (selectedIndex !== "S&P 500")
    {
        alert("Only the S&P 500 can be selected at this moment."); 
        errorFlag = true;
    }
    
    if (selectedLookback !== "1 QUARTER")
    {
        alert("Only '1 QUARTER' can be selected at this moment.");
        errorFlag = true;
    }
    
    if (errorFlag === false) 
    {
      setOutputText("Loading...");
      //const stockData = JSON.parse(stocks);
      const size = Object.keys(stocks).length;
      console.log(size);

      console.log("Looking for companies");
      
      for (let i = 0; i < size; i++)
      {
          //FINANCIAL DOCUMENT MATCHING
          if (selectedDocument === stocks[i]["FinancialDocumentType"])
          {
            companyBucket.push(stocks[i]["Ticker"]);
            console.log("added ", stocks[i]['Ticker']);
          }
      }
      
      

    }
    else
    {
      setOutputText("Error occurred. Please fix input.")
    }
    
  }*/
  
    const action = (
      <React.Fragment>
        <Button color="secondary" size="small" onClick={handleClose}>
          CLOSE
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          
        </IconButton>
      </React.Fragment>
    );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="FINISHED"
        action={action}
      />
      <ResponsiveAppBar doneLoading={doneLoading}/>
      <div style={{ paddingTop: '20px' }}>
        
        
        <Box sx= {{ flexGrow: 1, display: 'flex'}}>
          <Grid container spacing={3}>
            
            <Grid item xs={7}>
              <Item
                sx={{
                  paddingTop: '30px',
                  paddingBottom: '83px', 
                  paddingLeft: '0px',
                  position: 'sticky',
                  top: 120,
                  zIndex: 1000
                }}
                elevation={0}
              >

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}><LineChart
                xAxis={[
                  { data: xAxisTime, scaleType: 'time', label: "Date" }
                ]}
                series={[
                  { 
                    data: yAxisPortfolioValue, showMark: false, label: "DATA Portfolio Value (Thousands of Dollars)", color: '#59a14f'
                  },
                  {
                    data: benchmarkData, showMark: false, label: "(SPY) S&P 500 (Thousands of Dollars)", color: '#e15759'
                  },
                  {
                    data: benchmarkDataEqualWeight, showMark: false, label: "(SPXEW) S&P 500 Equal Weight (Thousands of Dollars)", color: '#f28e2c'
                  }
                ]}
                justifyContent="center"
                grid={{ vertical: true, horizontal: true }}
                width={900}
                height={600}
                axisHighlight={{
                  x: 'line', 
                  y: 'line'
                }}
              
              /></div>
             <Box sx={{ justifyContent: 'center', display: 'flex', mt: 4, ml:7 }}>
              <Grid container spacing={2} justifyContent="center">
                  <Grid size={4}>
                    <Item><Button variant="outlined" onClick={searchCompanies}>SEARCH EQUITIES</Button></Item>
                  </Grid>
                  <Grid size={4}>
                    <Item>
                      {companiesFound && 
                        <Button variant="outlined" onClick={createReturns}>RUN BACKTEST</Button>
                      }
                      {!companiesFound&& 
                        <Button variant="outlined" disabled>RUN BACKTEST</Button>
                      }
                    </Item>
                  </Grid>
                  <Grid size={4}>
                    <Item>
                      {(companiesFound && returnsGenerated) && 
                        <Button variant="outlined" onClick={downloadCSV}>DOWNLOAD CSV</Button>
                      }
                      {(!companiesFound || !returnsGenerated) && 
                        <Button variant="outlined" disabled>DOWNLOAD CSV</Button>
                      }
                    </Item>
                  </Grid>
                  <Grid size={4}>
                    <Item>
                      {(companiesFound) && 
                        <Button variant="outlined" onClick={saveCriteria}>SAVE CRITERIA</Button>
                      }
                      {(!companiesFound) && 
                        <Button variant="outlined" disabled>SAVE CRITERIA</Button>
                      }
                    </Item>
                  </Grid>
                </Grid>
                
              </Box>
              <Box sx={{ justifyContent: 'center', display: 'flex', mt: 4, ml:7 }}>
              <Grid container spacing={2} justifyContent="center">
                  <Grid size={6}>
                    {(companiesFound) && <p>Companies Found...{companiesFoundTimeStamp}</p>}
                  </Grid>
                  <Grid size={6} sx={{ml: 3}}>
                    {(returnsGenerated) && <p>Backtest Complete...{backtestCompleteTimeStamp}</p>}
                  </Grid>
                </Grid>
                </Box>
              </Item>
            </Grid>
            <Grid item xs={0.5}><Divider orientation="vertical" variant='middle' flexItem 
              sx={{ 
                borderRightWidth: '0.5px', // Increase thickness
                borderColor: '#5d1975', // Set a visible color
                height: '95%', // Ensure it takes full height
                alignSelf: 'stretch' // Make sure it stretches across the height of the container
              }} 
            /></Grid>
            <Grid item xs={4}>
            <Typography variant="subtitle2"
              sx={{
                fontFamily: 'BlinkMacSystemFont',
                letterSpacing: '0rem',
                textDecoration: 'none'
            }}>
          
                <CriteriaInput 
                  backtestName={backtestName}
                  handleBacktestName={handleBacktestName}
                  selectedIndex={selectedIndex}
                  optionSelected={optionSelected}
                  selectedLookback={selectedLookback}
                  lookbackSelected={lookbackSelected}
                  selectedDocument={selectedDocument}
                  documentSelected={documentSelected}
                  maxCompanies={maxCompanies}
                  absoluteValue={absoluteValue}
                  handleAbsoluteChange={handleAbsoluteChange}
                  selectedRelative={selectedRelative}
                  relativeSelected={relativeSelected}
                  relativeValue={relativeValue}
                  handleRelativeChange={handleRelativeChange}
                  selectedRelativeCriteria={selectedRelativeCriteria}
                  relativeCriteriaSelected={relativeCriteriaSelected}
                  selectedComparison={selectedComparison}
                  comparisonSelected={comparisonSelected}
                  selectedPageCount={selectedPageCount}
                  pageCountSelected={pageCountSelected}
                  handlePageCountChange={handlePageCountChange}
                  pageCountValue={pageCountValue}
                  sliderValue={sliderValue}
                  handleSliderChange={handleSliderChange}
                  selectedPositiveComparison={selectedPositiveComparison}
                  positiveComparisonSelected={positiveComparisonSelected}
                  positiveSliderValue={positiveSliderValue}
                  handlePosSliderChange={handlePosSliderChange}
                  selectedNegativeComparison={selectedNegativeComparison}
                  negativeComparisonSelected={negativeComparisonSelected}
                  negativeSliderValue={negativeSliderValue}
                  handleNegSliderChange={handleNegSliderChange}
                  selectedChangeType={selectedChangeType}
                  changeTypeSelected={changeTypeSelected}
                  changeYearSliderValue={changeYearSliderValue}
                  handleYearSliderChange={handleYearSliderChange}
                  uncertaintyValue={uncertaintyValue}
                  uncertaintySliderChange={uncertaintySliderChange}
                  selectedUncertaintyType={selectedUncertaintyType}
                  uncertaintyTypeSelected={uncertaintyTypeSelected}
                  selectedRebalancingPeriod={selectedRebalancingPeriod}
                  rebalancingPeriodSelected={rebalancingPeriodSelected}
                  
                  
                  
                  
                  
                  selectedLongTermFocusType={selectedLongTermFocusType}
                  longTermFocusTypeSelected={longTermFocusTypeSelected}
                  longTermValue={longTermValue}
                  longTermSliderChange={longTermSliderChange}
                  
                  selectedShortTermFocusType={selectedShortTermFocusType}
                  shortTermFocusTypeSelected={shortTermFocusTypeSelected}
                  shortTermValue={shortTermValue}
                  shortTermSliderChange={shortTermSliderChange}
                  

                  selectedInternalFocusType={selectedInternalFocusType}
                  internalFocusTypeSelected={internalFocusTypeSelected}
                  internalValue={internalValue}
                  internalSliderChange={internalSliderChange}
                  

                  selectedExternalFocusType={selectedExternalFocusType}
                  externalFocusTypeSelected={externalFocusTypeSelected}
                  externalValue={externalValue}
                  externalSliderChange={externalSliderChange}
                  

                  

                  lagValue={lagValue}
                  handleLagValue={handleLagValue}

                  enterTradeValue={enterTradeValue}
                  handleEnterTrade={handleEnterTrade}

                  exitTradeValue={exitTradeValue}
                  handleExitTrade={handleExitTrade}

                  assetsUnderManagement={assetsUnderManagement}
                  handleAssetsUnderManagement={handleAssetsUnderManagement}

                  selectedPriceRebalancingPeriod={selectedPriceRebalancingPeriod}
                  priceRebalancingPeriodSelected={priceRebalancingPeriodSelected}

                  priceRebalancingFrequency={priceRebalancingFrequency}
                  handlePriceRebalancingFrequency={handlePriceRebalancingFrequency}

                  tradingCosts={tradingCosts}
                  handleTradingCosts={handleTradingCosts}

                  selectedTradingCostType={selectedTradingCostType}
                  handleTradingCostType={handleTradingCostType}

                  temp = {temp}
                  //setTemp = {setTemp}
                  handleTemp={handleTemp}
                />
               
              </Typography>    
            </Grid>
            <Grid item xs={0.5}>
              <CheckboxStack 
                checkAbsolute={checkAbsolute}
                handleAbsolute={handleAbsolute}
                
                checkRelative={checkRelative}
                handleRelative={handleRelative}

                checkPageCount={checkPageCount}
                handlePageCount={handlePageCount}

                checkDeceptiveFragPercent={checkDeceptiveFragPercent}
                handleDeceptiveFragPercent={handleDeceptiveFragPercent}

                checkPositiveFrag={checkPositiveFrag}
                handlePositiveFrag={handlePositiveFrag}

                checkNegativeFrag={checkNegativeFrag}
                handleNegativeFrag={handleNegativeFrag}

                checkYearChange={checkYearChange}
                handleYearChange={handleYearChange}

                checkFinancialUncertainty={checkFinancialUncertainty}
                handleFinancialUncertainty={handleFinancialUncertainty}

                checkLongTermFocus={checkLongTermFocus}
                handleLongTermFocus={handleLongTermFocus}

                checkShortTermFocus={checkShortTermFocus}
                handleShortTermFocus={handleShortTermFocus}

                checkInternalFocus={checkInternalFocus}
                handleInternalFocus={handleInternalFocus}

                checkExternalFocus={checkExternalFocus}
                handleExternalFocus={handleExternalFocus}

                handleSelectAll={handleSelectAll}
              />
            </Grid>
          </Grid>
        </Box>
        <br></br><br></br>

        <Typography variant="h4" gutterBottom 
            sx={{
              ml: 3,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'BlinkMacSystemFont',
              fontWeight: 500,
              letterSpacing: '0rem',
              textDecoration: 'none'
            }}>
          Portfolio Composition
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
        
        <DenseTable data={detailedPortfolio}/>
        <DataAlertGrid alertMessages={alertMessages} excessReturn={excessReturn} years={Object.keys(dATAAnnualReturns)} DATAAnnualReturns={Object.values(dATAAnnualReturns)} SPYAnnualReturns={Object.values(sPYAnnualReturns)} SPYEqAnnualReturns={Object.values(sPYEqAnnualReturns)}
          dataCAGR={dataCAGR} spyCAGR={spyCAGR} spyeqCAGR={spyeqCAGR} dataReturn={dataReturn} spyReturn={spyReturn} spyEqReturn={spyEqReturn}
        />
        
        <Documentation />
        
        
        <br></br><br></br>
        
        <br></br><br></br>
        
      </div>
    </div>
  );
}

export default App;
