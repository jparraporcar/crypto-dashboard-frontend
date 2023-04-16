import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ModelViewer } from '../common/BitcoinAnimation/ModelViewer'
import { Hourglass } from '../common/Hourglass/Hourglass'
export const WelcomePage: React.FC = (): JSX.Element => {
    const navigate = useNavigate()

    return (
        <Box component="div" sx={{ height: '100vh' }}>
            <Box component="div">
                <ModelViewer />
            </Box>
            <Box
                component="div"
                sx={{
                    position: 'absolute',
                    zIndex: '1000',
                    top: '55%',
                    left: 0,
                    right: 0,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box component="div">
                    <Typography
                        variant="h5"
                        marginBottom={4}
                        textAlign="center"
                    >
                        Welcome to Crypto Dashboard
                        <br />
                        Get extra info about your favourite tokens
                    </Typography>
                </Box>
                <Box component="div">
                    <Button
                        size="large"
                        variant="outlined"
                        onClick={() => navigate('/Credentials')}
                    >
                        Access here
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
