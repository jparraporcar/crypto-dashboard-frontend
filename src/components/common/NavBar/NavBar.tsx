import { Box, Divider, IconButton, Typography } from '@mui/material'
import React from 'react'
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin'
import { MainMenu } from '../MainMenu/MainMenu'

interface IPropsNavBar {
    mainTitle: string
}

export const NavBar: React.FC<IPropsNavBar> = ({ mainTitle }): JSX.Element => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <Box
            component="div"
            sx={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                height: '40px',
                border: '1px solid grey',
                backgroundColor: '#f7d759',
            }}
        >
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <CurrencyBitcoinIcon />
                    </IconButton>
                    <Divider orientation="vertical" flexItem={true} />
                </Box>
                <Box component="div" sx={{ marginRight: '30px' }}>
                    <Typography
                        variant="h6"
                        marginLeft="15px"
                        sx={{ textShadow: '1px 1px 1px grey' }}
                    >
                        {mainTitle}
                    </Typography>
                    <MainMenu
                        handleClose={handleClose}
                        anchorEl={anchorEl}
                        open={open}
                    />
                </Box>
            </Box>
            <Box component="div">
                <Typography
                    variant="h6"
                    marginRight="15px"
                    sx={{
                        textShadow: '1px 1px 1px grey',
                    }}
                >
                    Crypto Dashboard
                </Typography>
            </Box>
        </Box>
    )
}
