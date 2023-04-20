import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ChartData,
    PointElement,
    LineElement,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setEvolSymbol } from '../../../app/slices/layoutSlice'
import { useMediaQuery } from '@mui/material'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
interface IPropsData {
    dataChart: ChartData<'line', number[], string>
    type?: string
}

export const ChartCustomLineMain: React.FC<IPropsData> = ({
    dataChart,
    type,
}): JSX.Element => {
    const dispatch = useAppDispatch()
    const evolSymbolState = useAppSelector((state) => state.layout.evolSymbol)
    const isSmallScreen = useMediaQuery('(max-width: 1500px)')
    const options = {
        onClick: (event: any, elements: any) => {
            if (elements.length > 0) {
                if (evolSymbolState.chartSymbol !== '') {
                    console.log('here')
                    dispatch(
                        setEvolSymbol({
                            chartTitle: '',
                            chartSymbol: '',
                            chartIndex: undefined,
                        })
                    )
                    return
                }
                dispatch(
                    setEvolSymbol({
                        chartTitle: dataChart
                            ? dataChart.datasets[0].label!
                            : '',
                        chartSymbol: dataChart
                            ? dataChart.labels![elements[0].index]
                            : '',
                        chartIndex: dataChart ? elements[0].index : undefined,
                    })
                )
            }
        },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
            },
        },
        scales: {
            y: {
                ticks: {
                    color: isSmallScreen ? 'transparent' : '#666',
                },
            },
        },
    }

    const optionsFixed = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'transparent',
                },
                ticks: {
                    color: 'transparent',
                },
            },
        },
        elements: {
            point: {
                radius: 0,
            },
            line: {
                borderWidth: 0,
            },
        },
        layout: {
            padding: {
                top: 32, // adjust as needed
                // bottom: 10, // adjust as needed
            },
        },
    }

    return (
        <Line
            options={type === 'fixed' ? optionsFixed : options}
            data={dataChart as ChartData<'line', number[], string>}
        />
    )
}
