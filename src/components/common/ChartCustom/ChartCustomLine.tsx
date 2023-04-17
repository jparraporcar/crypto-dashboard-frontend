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
    const options = {
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
