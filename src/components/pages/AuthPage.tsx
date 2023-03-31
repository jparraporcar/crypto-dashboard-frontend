import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ModelViewer } from '../common/BitcoinAnimation/ModelViewer'
export const AuthPage: React.FC = (): JSX.Element => {
    const navigate = useNavigate()

    return (
        <Box component="div" sx={{ height: '100vh' }}>
            <Box>
                <ModelViewer />
            </Box>
            <Box
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
                <Box>
                    <Typography variant="h6" marginBottom={2}>
                        Welcome to Crypto Dashboard. Get extra info about your
                        favourite tokens
                    </Typography>
                </Box>
                <Box>
                    <Button
                        size="large"
                        variant="outlined"
                        onClick={() => navigate('/multiplePVData')}
                    >
                        Home
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
