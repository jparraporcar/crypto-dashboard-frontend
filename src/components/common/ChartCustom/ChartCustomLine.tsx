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
import { setEvolSymbol } from '../../../app/slices/layoutSlice'
import { useAppDispatch } from '../../../app/hooks'

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

export const ChartCustomLine: React.FC<IPropsData> = ({
    dataChart,
}): JSX.Element => {
    const dispatch = useAppDispatch()
    const options = {
        onClick: (event: any, elements: any) => {
            if (elements.length > 0) {
                dispatch(
                    setEvolSymbol({
                        chartTitle: '',
                        chartSymbol: '',
                        chartIndex: undefined,
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
