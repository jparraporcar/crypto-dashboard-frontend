import { Box, SxProps } from '@mui/material'
import React from 'react'
import { NavBar } from '../common/NavBar/NavBar'
import { PaperCard } from '../common/PaperCard/PaperCard'
import { NavTabsWrapper } from '../common/NavTabsWrapper/NavTabsWrapper'

export const CredentialsPage: React.FC = (): JSX.Element => {
    //TODO: Pending to understand the styles below
    const sxCredentialsPage: SxProps = {
        display: 'block',
        '& > :not(style)': {
            m: 1,
            width: 500,
            height: '100%',
        },
    }
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
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: '40px',
                    width: '100vw',
                    height: 'calc(100vh - 40px)',
                }}
            >
                <PaperCard
                    sxCustom={sxCredentialsPage}
                    content={<NavTabsWrapper />}
                />
            </Box>
        </Box>
    )
}
