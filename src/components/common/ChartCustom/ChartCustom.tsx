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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
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

interface IPropsData {
    dataChart: ChartData<'bar', number[]>
}

export const ChartCustom: React.FC<IPropsData> = ({
    dataChart,
}): JSX.Element => {
    return <Bar options={options} data={dataChart} />
}
