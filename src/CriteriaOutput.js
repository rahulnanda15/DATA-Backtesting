import React from 'react';

function CriteriaOutput(props)
{
    return(
        <div>
            <h3>DECISION CRITERIA:</h3>
            <p> <b>Search From:</b> {props.selectedIndex} </p>
            <p> <b>Lookback Period: </b> {props.selectedLookback}</p>
            <p> <b> Document Type:</b> {props.selectedDocument} </p>
            <p> <b>Portfolio Rebalancing Period: </b> {props.selectedRebalancingPeriod} </p>
            <p> <b>Price Rebalancing Period: </b> Every {props.priceRebalancingFrequency} {props.selectedPriceRebalancingPeriod} </p>
            <p> <b>Absolute Criteria: </b>Top  {props.absoluteValue} Most {props.selectedRelative} Companies</p>
            <p> <b>Truthful Fragments Percentage: </b>{props.selectedComparison} {props.sliderValue}%</p>
            <p> <b>Positive Fragments Average DATA Score:</b> {props.selectedPositiveComparison} {props.positiveSliderValue}%</p>
            <p> <b>Negative Fragments Average DATA Score: </b>{props.selectedNegativeComparison} {props.negativeSliderValue}%</p>
            <p> <b>Year on Year Change: </b>{props.selectedChangeType} {props.changeYearSliderValue}%</p>
            <p> <b>Financial Uncerainty: </b> {props.selectedUncertaintyType} {props.uncertaintyValue}%</p>
            <p> <b>Long Term Focus: </b> {props.selectedLongTermFocusType} {props.longTermValue}%</p>
            <p> <b>Short Term Focus: </b> {props.selectedShortTermFocusType} {props.shortTermValue}%</p>
            <p> <b>Internal Focus: </b> {props.selectedInternalFocusType} {props.internalValue}%</p>
            <p> <b>External Focus: </b> {props.selectedExternalFocusType} {props.externalValue}%</p>
            <p> <b>Trading Lag Period (Days): </b> {props.lagValue}</p>
            <p> <b>Number of Days to Enter Trade: </b> {props.enterTradeValue}</p>
            <p> <b>Number of Days to Exit Trade: </b> {props.exitTradeValue}</p>
            <p> <b>Portfolio Assets Under Management (AUM) (Millions): </b> ${props.assetsUnderManagement} million</p>

        </div>
    );
    
}

export default CriteriaOutput;