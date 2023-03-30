import { Box, Divider, IconButton, Typography } from '@mui/material'
import React from 'react'
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin'
import { MainMenu } from '../MainMenu/MainMenu'

export const NavBar: React.FC = (): JSX.Element => {
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
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <Box
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
                <Typography
                    variant="h6"
                    sx={{
                        marginRight: '15px',
                        textShadow: '1px 1px 1px grey',
                    }}
                >
                    Menu
                </Typography>
                <Divider orientation="vertical" flexItem={true} />
            </Box>
            <Box sx={{ marginRight: '30px' }}>
                <Typography
                    variant="h5"
                    marginLeft="30px"
                    sx={{ textShadow: '1px 1px 1px grey' }}
                >
                    Volume and Price statistics
                </Typography>
                <MainMenu
                    handleClose={handleClose}
                    anchorEl={anchorEl}
                    open={open}
                />
            </Box>
        </Box>
    )
}
