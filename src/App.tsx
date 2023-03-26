import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorPage } from './components/pages/ErrorPage'
import { RootLayout } from './components/layout/RootLayout'
import { PriceAndVolumeDataPage } from './components/pages/PriceAndVolumeDataPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <PriceAndVolumeDataPage />,
                errorElement: <ErrorPage />,
            },
        ],
    },
])

export const App: React.FC = (): JSX.Element => {
    return <RouterProvider router={router} />
}
