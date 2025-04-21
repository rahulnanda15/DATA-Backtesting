import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import _ from 'lodash';
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { useRef } from 'react';

function CriteriaInput(props)
{
    return(
        <div>
            
            <label> SELECT ALL: (Checked = Enabled, Unchecked = Disabled) </label> <br></br><br></br>
            <label> <b>Backtest Name (Optional):</b> </label>
            <input type="text" value={props.backtestName} onChange={props.handleBacktestName}></input>
            <br></br><br></br>
            <label for="indexes"><b>Stock Index: </b> </label>
            <select name="indexes" value={props.selectedIndex} onChange={props.optionSelected}>
                <option value="S&P 500">S&P 500</option>
                <option value="S&P 400">S&P 400</option>
                <option value="Russell 1000">Russell 1000</option>
                <option value="Russell 2000">Russell 2000</option>
                <option value="Russell 3000">Russell 3000</option>
                <option value="ALL COMPANIES">ALL COMPANIES</option>
            </select>
            <br></br><br></br>
            <label for="lookback"><b>Lookback Period: </b></label>
            <select name="lookback" value={props.selectedLookback} onChange={props.lookbackSelected}>
                <option value="1 QUARTER">1 QUARTER</option>
                <option value="2 QUARTERS">2 QUARTERS</option>
                <option value="3 QUARTERS">3 QUARTERS</option>
                <option value="1 YEAR">1 YEAR</option>
            </select>
            <br></br><br></br>
            <label for="documenttype"><b>Document Type: </b></label>
            <select name="documenttype" value={props.selectedDocument} onChange={props.documentSelected}>
                <option value="10-K">10-K</option>
                <option value="10-K/A">10-K/A</option>
                <option value="10-Q">10-Q</option>
                <option value="20-F">20-F</option>
                <option value="8-K">8-K</option>
                <option value="14A">14A</option>
                <option value="MISC">MISC</option>
                <option value="ANY">ANY</option>
            </select>
            
            <br></br><br></br>
            <label for="rebalancingperiod"> <b> Portfolio Rebalancing Period: </b></label>
            <select name="rebalancingperiod" value={props.selectedRebalancingPeriod} onChange={props.rebalancingPeriodSelected}>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
            </select>

            <br></br><br></br>
            <label for="pricerebalancingperiod"> <b> Price Rebalancing Period: </b></label>
            <label for="pricerebalancingperiod">  Every </label>
            <input name="pricerebalancingperiod" ref={props.priceRebalancingFrequency} onChange={props.handlePriceRebalancingFrequency}></input>
            <select name="pricerebalancingperiod" value={props.selectedPriceRebalancingPeriod} onChange={props.priceRebalancingPeriodSelected}>
                <option value="Trading Days">Trading Days</option>
                <option value="Months">Months</option>
                <option value="Quarters">Quarters</option>
                <option value="Years">Years</option>
            </select>

            <br></br><br></br>
            <label for="relativecomp"><b>Absolute Criteria: </b> </label>
            <input type="text" name="absolute" value={props.absoluteValue} onChange={props.handleAbsoluteChange}></input>

         
            <label for="relativecomp"> Most </label>
            <select name="relativecomp" value={props.selectedRelative} onChange={props.relativeSelected}>
                <option value="Deceptive">Deceptive</option>
                <option value="Truthful">Truthful</option>
            </select>

            <br></br><br></br>
            <label for="relativecriteria"><b>Relative Criteria: </b> </label>
            <select name="relativecriteria" value={props.selectedRelativeCriteria} onChange={props.relativeCriteriaSelected}>
                <option value="Greater Than">Greater Than</option>
                <option value="Less Than or Equal to">Less Than or Equal to</option>
            </select>
            <input type="text" name="relativecriteria" value={props.relativeValue} onChange={props.handleRelativeChange}></input>
         
            <label for="relativecomp"> % </label>
           
            
            <br></br><br></br>
            <label for="pagecount"><b>Page Count: </b></label>
            <select name="pagecount" value={props.selectedPageCount} onChange={props.pageCountSelected}>
                <option value="Greater Than">Greater Than</option>
                <option value="Less Than or Equal to">Less Than or Equal to</option>
            </select>
            <input type="range" name="pagecount" min="1" max="1500" value={props.pageCountValue} onChange={props.handlePageCountChange}></input>
            <label for="slider"> {props.pageCountValue}</label>
            
            

            <br></br><br></br>
            <label for="slider"><b>Deceptive Frag %: </b></label>
            <select name="comparison" value={props.selectedComparison} onChange={props.comparisonSelected}>
                <option value="Greater Than">Greater Than</option>
                <option value="Less Than or Equal to">Less Than or Equal to</option>
            </select>
            <input type="range" name="slider" min="0" max="100" value={props.sliderValue} onChange={props.handleSliderChange}></input>
            <label for="slider"> {props.sliderValue}%</label>
            
            

            <br></br><br></br>

            <label for="posSlider"> <b>(+) Frag Avg DATA Score: </b></label>
            <select name="posSlider" value={props.selectedPositiveComparison} onChange={props.positiveComparisonSelected}>
                <option value="Greater Than">Greater Than </option>
                <option value="Less Than or Equal to">Less Than or Equal to</option>
            </select>
            <input type="range" name="posSlider" min="0" max="100" value={props.positiveSliderValue} onChange={props.handlePosSliderChange} style={{width: '90px'}}></input>
            <label for="posSlider"> {props.positiveSliderValue}% </label>
          
           

            <br></br><br></br>

            <label for="negSlider"> <b>(-) Frag Avg DATA Score: </b></label>
            <select name="negSlider" value={props.selectedNegativeComparison} onChange={props.negativeComparisonSelected}>
                <option value="Greater Than">Greater Than </option>
                <option value="Less Than or Equal to">Less Than or Equal to</option>
            </select>
            <input type="range" name="negSlider" min="-100" max="0" value={props.negativeSliderValue} onChange={props.handleNegSliderChange} style={{width: '90px'}}></input>
            <label for="negSlider"> {props.negativeSliderValue}% </label>
            
            

            <br></br><br></br>
            <label for="yearchange"> <b>Year on Year Change: </b></label>
            <select name="yearchange" value={props.selectedChangeType} onChange={props.changeTypeSelected}>
                <option value="Greater Than">Greater Than </option>
                <option value="Less Than or Equal to">Less Than or Equal to</option>
            </select>
            <input type="range" name="changeslider" min="-100" max="100" step="0.5" value={props.changeYearSliderValue} onChange={props.handleYearSliderChange} style={{width: '110px'}}></input>
            <label for="changeslider"> {props.changeYearSliderValue}%</label>
       
            

            <br></br><br></br>
            <label for="financialuncertainty"> <b> Financial Uncertainty: </b></label>
            <select name="financialuncertainty" value={props.selectedUncertaintyType} onChange={props.uncertaintyTypeSelected}>
                <option value="Greater Than">Greater Than</option>
                <option value="Less Than or Equal to">Less Than or Equal to</option>
            </select>
            <input type="range" name="financialuncertainty" min="0" max="5" step="0.1" value={props.uncertaintyValue} onChange={props.uncertaintySliderChange} style={{width: '110px'}}></input>
            <label for="financialuncertainty"> {props.uncertaintyValue}%</label>
            
            

            <br></br><br></br>

            <label for="longtermfocus"> <b> Long Term Focus: </b></label>
            <select name="longtermfocus" value={props.selectedLongTermFocusType} onChange={props.longTermFocusTypeSelected}>
                <option value="Greater Than">Greater Than</option>
                <option value="Less Than or Equal to">Less Than or Equal to</option>
            </select>
            <input type="range" name="longtermfocus" min="0" max="5" step="0.1" value={props.longTermValue} onChange={props.longTermSliderChange}></input>
            <label for="longtermfocs"> {props.longTermValue}% </label>
            
   

            <br></br><br></br>

            <label for="shorttermfocus"> <b> Short Term Focus: </b></label>
            <select name="shorttermfocus" value={props.selectedShortTermFocusType} onChange={props.shortTermFocusTypeSelected}>
                <option value="Greater Than">Greater Than</option>
                <option value="Less Than or Equal to">Less Than or Equal to</option>
            </select>
            <input type="range" name="shorttermfocus" min="0" max="5" step="0.1" value={props.shortTermValue} onChange={props.shortTermSliderChange}></input>
            <label for="shorttermfocs"> {props.shortTermValue}% </label>
          
            

            <br></br><br></br>

            <label for="internalfocus"> <b> Internal Focus: </b></label>
            <select name="internalfocus" value={props.selectedInternalFocusType} onChange={props.internalFocusTypeSelected}>
                <option value="Greater Than">Greater Than</option>
                <option value="Less Than or Equal to">Less Than or Equal to</option>
            </select>
            <input type="range" name="internalfocus" min="0" max="5" step="0.1" value={props.internalValue} onChange={props.internalSliderChange}></input>
            <label for="internalfocs"> {props.internalValue}% </label>
            
           

            <br></br><br></br>

            <label for="externalfocus"> <b> External Focus: </b></label>
            <select name="externalfocus" value={props.selectedExternalFocusType} onChange={props.externalFocusTypeSelected}>
                <option value="Greater Than">Greater Than</option>
                <option value="Less Than or Equal to">Less Than or Equal to</option>
            </select>
            <input type="range" name="externalfocus" min="0" max="5" step="0.1" value={props.externalValue} onChange={props.externalSliderChange}></input>
            <label for="externalfocs"> {props.externalValue}% </label>
            
           

            <br></br><br></br>

            <label for="tradinglag"> <b>Trading Lag Period (Calendar Days 0-59): </b></label>
            <input name="tradinglag" value={props.lagValue} onChange={props.handleLagValue}></input>
            <br></br><br></br>
            <label for="entertrade"> <b>Number of Days to Enter Trade: </b></label>
            <input name="entertrade" value={props.enterTradeValue} onChange={props.handleEnterTrade}></input>
            <br></br><br></br>
            <label for="exittrade"> <b>Number of Days to Exit Trade: </b></label>
            <input name="exittrade" value={props.exitTradeValue} onChange={props.handleExitTrade}></input>
            <br></br><br></br>
            <label for="aum"> <b>Portfolio Assets Under Management (AUM): </b> $</label>
            <input name="aum" value={props.assetsUnderManagement} onChange={props.handleAssetsUnderManagement}></input>
            <br></br><br></br>
            <label for="tradingcost"> <b>Trading Costs: </b> </label>
            <input name="tradingcost" value={props.tradingCosts} onChange={props.handleTradingCosts}></input>
            <select name="tradingcost" value={props.selectedTradingCostType} onChange={props.handleTradingCostType}>
                <option value="Dollars Per Share">Dollars Per Share</option>
                <option value="% of Share">% of Share</option>
            </select>
            
        </div>
    );
    
}

export default CriteriaInput;