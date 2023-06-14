import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RootLayout } from './components/layout/RootLayout'
import { WelcomePage } from './components/pages/WelcomePage'
import { MultiplePVDataPage } from './components/pages/MultiplePVDataPage'
import { CredentialsPage } from './components/pages/CredentialsPage'
import { settingsLoader, SettingsPage } from './components/pages/SettingsPage'
import { PrivatePageWrapper } from './components/pages/PrivatePageWrapper'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <WelcomePage />,
            },
            {
                path: '/credentials',
                element: <CredentialsPage />,
            },
            {
                path: '/settings',
                element: (
                    <PrivatePageWrapper>
                    <SettingsPage />
                    </PrivatePageWrapper>
                ),
                loader: settingsLoader,
            },
            {
                path: '/multiplePVData',
                element: (
                    <PrivatePageWrapper>
                    <MultiplePVDataPage />
                    </PrivatePageWrapper>
                ),
            },
        ],
    },
])

export const App: React.FC = (): JSX.Element => {
    return <RouterProvider router={router} />
}
