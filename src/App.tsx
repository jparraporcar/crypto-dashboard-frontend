import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

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
            },
        ],
    },
])

export const App: React.FC = (): JSX.Element => {
    return <RouterProvider router={router} />
}
