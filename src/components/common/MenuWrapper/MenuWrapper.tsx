import { Box, Menu } from '@mui/material'
import React from 'react'

interface IPropsMainMenu {
    handleMainMenuClose: () => void
    anchorEl: HTMLElement | null
    open: boolean
    menuContent: JSX.Element
}

export const MenuWrapper: React.FC<IPropsMainMenu> = ({
    anchorEl,
    open,
    handleMainMenuClose,
    menuContent,
}): JSX.Element => {
    return (
        <Box component="div" sx={{ backgroundColor: 'yellow' }}>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMainMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {menuContent}
            </Menu>
        </Box>
    )
}
