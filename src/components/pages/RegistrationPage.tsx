import { Box, Button, Paper } from '@mui/material'
import React from 'react'
import { InputRegistration } from '../common/InputRegistration/InputRegistration'
import { NavBar } from '../common/NavBar/NavBar'
import { PaperCard } from '../common/PaperCard/PaperCard'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setSnackbarCustom } from '../../app/slices/layoutSlice'
import { SnackbarCustom } from '../common/SnackbarCustom/SnackbarCustom'

export const RegistrationPage: React.FC = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const snackbarCustomState = useAppSelector((state) => state.layout.snackbar)
    const handleClose = () => {
        dispatch(setSnackbarCustom({ ...snackbarCustomState, isOpen: false }))
    }
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
            }}
        >
            <NavBar mainTitle="Registration" />
            <Box
                sx={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: '40px',
                    width: '100vw',
                    height: 'calc(100vh - 40px)',
                }}
            >
                <PaperCard content={<InputRegistration />} />
                <SnackbarCustom
                    handleClose={handleClose}
                    snackbarCustomState={snackbarCustomState}
                />
            </Box>
        </Box>
    )
}
