import { SxProps } from '@mui/material'
import { ChartData } from 'chart.js'
import React from 'react'

interface IPropsChartCustomScrollHelper {
    classNameOuterContainer: 'string'
    classNameInnerContainer: 'string'
    sxOuter: SxProps
    sxInner: SxProps
    dataChart: ChartData<'line', number[], string>
}

export const ChartCustomScrollHelper: React.FC<
    IPropsChartCustomScrollHelper
> = (): JSX.Element => {
    return <div>ChartCustomScrollHelper</div>
}
