import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RootLayout } from './components/layout/RootLayout'
import { AuthPage } from './components/pages/AuthPage'
import { MultiplePVDataPage } from './components/pages/MultiplePVDataPage'

// modifications log:
// -> Added new pages for multiple rolling window and authentication

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <AuthPage />,
            },
            {
                path: '/multiplePVData',
                element: <MultiplePVDataPage />,
            },
        ],
    },
])

export const App: React.FC = (): JSX.Element => {
    return <RouterProvider router={router} />
}
