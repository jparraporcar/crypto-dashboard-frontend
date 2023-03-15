import { Box } from '@mui/material'
import React from 'react'
import { ChartCustom } from './Components/common/ChartCustom/ChartCustom'
import { NavBar } from './Components/common/NavBar/NavBar'

export const App: React.FC = (): JSX.Element => {
    return (
        <Box
            sx={{
                backgroundColor: '#f7d759',
                border: '1px solid grey',
                position: 'relative',
            }}
        >
            <NavBar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    position: 'absolute',
                    top: '56px',
                    width: '100%',
                    padding: '30px',
                    height: 'calc(100vh - 57px)',
                }}
            >
                <Box>
                    <ChartCustom />
                </Box>
                <Box>
                    <ChartCustom />
                </Box>
            </Box>
        </Box>
    )
}
