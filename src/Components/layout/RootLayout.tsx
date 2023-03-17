import React from 'react'
import { Outlet } from 'react-router-dom'

export const RootLayout: React.FC = (): JSX.Element => {
    return (
        <>
            <Outlet />
        </>
    )
}