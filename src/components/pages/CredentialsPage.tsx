import { Box, SxProps } from '@mui/material'
import React from 'react'
import { NavBar } from '../common/NavBar/NavBar'
import { PaperCard } from '../common/PaperCard/PaperCard'
import { NavTabsWrapper } from '../common/NavTabsWrapper/NavTabsWrapper'
import { MenuGeneric } from '../common/MenuGeneric/MenuGeneric'

export const CredentialsPage: React.FC = (): JSX.Element => {
    //TODO: Pending to understand the styles below
    const sxCredentialsPage: SxProps = {
        display: 'block',
        '& > :not(style)': {
            width: '100%',
            height: '100%',
        },
    }
    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
            }}
        >
            <Box>
                <NavBar
                    mainTitle="User credentials"
                    position="fixed"
                    zIndex={2000}
                    menuContent={<MenuGeneric />}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100vw',
                    height: '100vh',
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
