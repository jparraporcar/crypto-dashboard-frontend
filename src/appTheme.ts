import { createTheme } from '@mui/material/styles'

export const appTheme = createTheme({
    palette: {
        primary: {
            main: '#f7d759',
        },
        secondary: {
            main: '#DCDCDC',
        },
    },
    components: {
        MuiMenu: {
            styleOverrides: {
                list: {
                    '&[role="menu"]': {
                        backgroundColor: '#f3d970',
                    },
                },
            },
        },
    },
})
