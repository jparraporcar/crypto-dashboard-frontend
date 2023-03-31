import { Box, Menu, MenuItem } from '@mui/material'
import React from 'react'

interface IPropsMainMenu {
    handleClose: () => void
    anchorEl: HTMLElement | null
    open: boolean
}

export const MainMenu: React.FC<IPropsMainMenu> = ({
    anchorEl,
    handleClose,
    open,
}): JSX.Element => {
    return (
        <Box component="div" sx={{ backgroundColor: 'yellow' }}>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Pause</MenuItem>
                <MenuItem onClick={handleClose}>Restart</MenuItem>
                <MenuItem onClick={handleClose}>Normalize</MenuItem>
                <MenuItem onClick={handleClose}>Interval</MenuItem>
                <MenuItem onClick={handleClose}>Auto sort</MenuItem>
            </Menu>
        </Box>
    )
}
