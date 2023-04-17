import { createTheme, responsiveFontSizes } from '@mui/material/styles'

export const appTheme = responsiveFontSizes(
    createTheme({
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
    }),
    { factor: 8 }
)
