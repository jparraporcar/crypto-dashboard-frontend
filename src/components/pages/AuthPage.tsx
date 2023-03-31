import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ModelViewer } from '../common/BitcoinAnimation/ModelViewer'
export const AuthPage: React.FC = (): JSX.Element => {
    const navigate = useNavigate()

    return (
        <Box
            component="div"
            sx={{
                height: '100vh',
                width: '100vh',
                backgroundColor: 'white',
                position: 'absolute',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    zIndex: '500',
                    height: '100vh',
                    width: '100vh',
                    left: '35%',
                }}
            >
                <ModelViewer />
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    zIndex: '1000',
                    height: '100vh',
                    width: '100vh',
                    top: '50%',
                    left: '65%',
                }}
            >
                <Button
                    variant="outlined"
                    onClick={() => navigate('/multiplePVData')}
                >
                    Click here
                </Button>
            </Box>
        </Box>
    )
}
