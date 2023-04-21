import { Box, SxProps } from '@mui/material'
import { ChartData } from 'chart.js'
import React from 'react'
import { ChartCustomLineMain } from '../ChartCustom/ChartCustomLineMain'

interface IPropsChartCustomScrollHelper {
    sxInner: SxProps
    dataChart: ChartData<'line', number[], string>
}

const sxOuterMobileHidden: SxProps = {
    position: 'relative',
    overflowX: 'hidden',
    width: '85vw',
}

export const ChartCustomScrollHelper: React.FC<
    IPropsChartCustomScrollHelper
> = (props): JSX.Element => {
    return (
        <Box className="outerMobileHidden" sx={sxOuterMobileHidden}>
            <Box className="inner" component="div" sx={props.sxInner}>
                <ChartCustomLineMain type="fixed" dataChart={props.dataChart} />
            </Box>
        </Box>
    )
}
