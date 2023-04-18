import React, { PropsWithChildren } from 'react'
import { useAppSelector } from '../../app/hooks'
import { Navigate } from 'react-router-dom'

export const PrivatePageWrapper: React.FC<PropsWithChildren> = ({
    children,
}): JSX.Element => {
    const isLoggedInState = useAppSelector((state) => state.auth.isLoggedIn)
    return (
        <>
            {isLoggedInState ? (
                children
            ) : (
                <Navigate to="/credentials" replace />
            )}
        </>
    )
}
