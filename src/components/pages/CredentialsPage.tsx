import { Box } from '@mui/material'
import React from 'react'
import { NavBar } from '../common/NavBar/NavBar'
import { PaperCard } from '../common/PaperCard/PaperCard'
import { NavTabsWrapper } from '../common/NavTabsWrapper/NavTabsWrapper'

export const CredentialsPage: React.FC = (): JSX.Element => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
            }}
        >
            <NavBar mainTitle="User credentials" />
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
                <PaperCard content={<NavTabsWrapper />} />
            </Box>
        </Box>
    )
}
