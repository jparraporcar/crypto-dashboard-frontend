import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorPage } from './components/layout/errorPage'
import { RootLayout } from './components/layout/RootLayout'
import {
    priceAndVolumeDataLoader,
    PriceAndVolumeDataPage,
} from './components/pages/PriceAndVolumeDataPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/priceAndVolumeData',
                element: <PriceAndVolumeDataPage />,
                loader: priceAndVolumeDataLoader,
            },
        ],
    },
])

export const App: React.FC = (): JSX.Element => {
    return <RouterProvider router={router} />
}
