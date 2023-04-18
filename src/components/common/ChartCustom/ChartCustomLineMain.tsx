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
}

export const ChartCustomLineMain: React.FC<IPropsData> = ({
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
        <Line
            options={options}
            data={dataChart as ChartData<'line', number[], string>}
        />
    )
}
