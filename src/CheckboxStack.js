import React from 'react';
import { Checkbox } from '@mui/material';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';

function CheckboxStack(props)
{


    return (
        <div>
            <FormControlLabel
                control={
                <Checkbox
                    checked={props.checkDeceptiveFragPercent && props.checkAbsolute && props.checkPageCount && props.checkPositiveFrag && props.checkNegativeFrag && props.checkYearChange && props.checkFinancialUncertainty && props.checkLongTermFocus && props.checkShortTermFocus && props.checkInternalFocus && props.checkExternalFocus}
                    indeterminate={!(props.checkDeceptiveFragPercent && props.checkAbsolute && props.checkPageCount && props.checkPositiveFrag && props.checkNegativeFrag && props.checkYearChange && props.checkFinancialUncertainty && props.checkLongTermFocus && props.checkShortTermFocus && props.checkInternalFocus && props.checkExternalFocus)}
                    onChange={props.handleSelectAll}
                />
                }
            />
            <Stack spacing={0.5} sx={{paddingTop: '258px', display: 'flex', flexDirection: 'column', ml: 1}}>
                <FormControlLabel
                    control={<Checkbox //Absolute
                        checked={props.checkAbsolute}
                        onChange={props.handleAbsolute}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />}
                />
                <FormControlLabel
                    control={<Checkbox //Relative
                        checked={props.checkRelative}
                        onChange={props.handleRelative}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />}
                />
                <FormControlLabel
                    control={<Checkbox //Page count
                        checked={props.checkPageCount}
                        onChange={props.handlePageCount}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />}
                />
                <FormControlLabel
                    control={<Checkbox //Deceptive frag %
                        checked={props.checkDeceptiveFragPercent} 
                        onChange={props.handleDeceptiveFragPercent}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />}
                />
                <FormControlLabel
                    control={<Checkbox //+ frag score
                        checked={props.checkPositiveFrag} 
                        onChange={props.handlePositiveFrag}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />}
                />
                <FormControlLabel
                    control={<Checkbox //- frag score
                        checked={props.checkNegativeFrag} 
                        onChange={props.handleNegativeFrag}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />}
                />
                <FormControlLabel
                    control={<Checkbox //yony change
                        checked={props.checkYearChange} 
                        onChange={props.handleYearChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />}
                />
                <FormControlLabel
                    control={<Checkbox //financial uncertainty
                        checked={props.checkFinancialUncertainty} 
                        onChange={props.handleFinancialUncertainty}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />}
                />
                <FormControlLabel
                    control={<Checkbox //long term focus
                        checked={props.checkLongTermFocus} 
                        onChange={props.handleLongTermFocus}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />}
                />
                <FormControlLabel
                    control={<Checkbox //short term focus
                        checked={props.checkShortTermFocus} 
                        onChange={props.handleShortTermFocus}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />}
                />
                <FormControlLabel
                    control={<Checkbox //internal focus
                        checked={props.checkInternalFocus} 
                        onChange={props.handleInternalFocus}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />}
                />
                <FormControlLabel
                    control={<Checkbox //external focus
                        checked={props.checkExternalFocus} 
                        onChange={props.handleExternalFocus}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />}
                />
            </Stack>
        </div>
    );
}

export default CheckboxStack;