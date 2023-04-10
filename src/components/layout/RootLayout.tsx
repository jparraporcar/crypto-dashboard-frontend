import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setSnackbarCustom } from '../../app/slices/layoutSlice'
import { SnackbarCustom } from '../common/SnackbarCustom/SnackbarCustom'

export const RootLayout: React.FC = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const snackbarCustomState = useAppSelector((state) => state.layout.snackbar)

    const handleClose = () => {
        dispatch(setSnackbarCustom({ ...snackbarCustomState, isOpen: false }))
    }

    return (
        <>
            <Outlet />
            <SnackbarCustom
                handleClose={handleClose}
                snackbarCustomState={snackbarCustomState}
            />
        </>
    )
}
