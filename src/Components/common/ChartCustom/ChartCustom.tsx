import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
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
            text: 'Chart.js Bar Chart',
        },
    },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
const volume = [12, 34, 45, 67, 87, 89, 90]

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: volume,
            backgroundColor: '#f7d759',
        },
    ],
}

export const ChartCustom: React.FC = (): JSX.Element => {
    return <Bar height={400} width={900} options={options} data={data} />
}
