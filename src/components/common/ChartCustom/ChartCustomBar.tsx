import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setEvolSymbol } from '../../../app/slices/layoutSlice'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface IPropsData {
    dataChart: ChartData<'bar', number[], string>
}

export const ChartCustomBar: React.FC<IPropsData> = ({
    dataChart,
}): JSX.Element => {
    const dispatch = useAppDispatch()
    const evolSymbolState = useAppSelector((state) => state.layout.evolSymbol)
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
    }

    return (
        <Bar
            options={options}
            data={dataChart as ChartData<'bar', number[], string>}
        />
    )
}
