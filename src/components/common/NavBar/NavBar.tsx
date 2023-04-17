import { Box, Divider, IconButton, Typography } from '@mui/material'
import React from 'react'
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin'
import { MenuWrapper } from '../MenuWrapper/MenuWrapper'

interface IPropsNavBar {
    mainTitle: string
    menuContent: JSX.Element
    position?: string
    zIndex?: number
    top?: number
}

export const NavBar: React.FC<IPropsNavBar> = ({
    mainTitle,
    position,
    zIndex,
    top,
    menuContent,
}): JSX.Element => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleIconButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        if (open) {
            setAnchorEl(null)
        } else {
            setAnchorEl(event.currentTarget)
        }
    }
    const handleMainMenuClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box
            component="div"
            sx={{
                position: position ? position : 'static',
                zIndex: zIndex ? zIndex : 0,
                top: top ? top : 0,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
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
                        onClick={handleIconButtonClick}
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
                    <MenuWrapper
                        anchorEl={anchorEl}
                        open={open}
                        handleMainMenuClose={handleMainMenuClose}
                        menuContent={menuContent}
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
