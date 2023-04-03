import { Box, Button, Paper } from '@mui/material'
import React from 'react'
import { InputRegistration } from '../common/InputRegistration/InputRegistration'
import { NavBar } from '../common/NavBar/NavBar'
import { PaperCard } from '../common/PaperCard/PaperCard'

export const RegistrationPage: React.FC = (): JSX.Element => {
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
            </Box>
        </Box>
    )
}
