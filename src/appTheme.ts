import { createTheme } from '@mui/material/styles'

export const appTheme = createTheme({
    palette: {
        primary: {
            main: '#f7d759',
        },
        secondary: {
            main: '#FFFFFF',
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
        MuiFilledInput: {
            styleOverrides: {
                input: {
                    backgroundColor: 'white',
                },
            },
        },
    },
})
