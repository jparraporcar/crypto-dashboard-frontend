import {
    Box,
    Divider,
    FormControl,
    InputLabel,
    NativeSelect,
    TextField,
    Typography,
} from '@mui/material'
import axios from 'axios'
import React from 'react'
import { json } from 'react-router-dom'
import { InputTickers } from '../common/InputTickers/InputTickers'
import { NavBar } from '../common/NavBar/NavBar'
import { SearchBar } from '../common/SearchBar/SearchBar'

export const SettingsPage: React.FC = (): JSX.Element => {
    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
            }}
        >
            <Box>
                <NavBar mainTitle="User personal settings" />
            </Box>
            <Box
                sx={{
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <Box
                    sx={{
                        height: '25vh',
                        padding: '25px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <Box component="form" sx={{ width: '25ch' }}>
                        <FormControl fullWidth>
                            <InputLabel
                                variant="standard"
                                htmlFor="uncontrolled-native"
                            >
                                Time frame
                            </InputLabel>
                            <NativeSelect
                                inputProps={{
                                    name: 'Time frame',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                <option value={'1M'}>1M</option>
                                <option value={'1W'}>1W</option>
                                <option value={'1D'}>1D</option>
                                <option value={'4h'}>4h</option>
                                <option value={'1h'}>1h</option>
                                <option value={'30m'}>30m</option>
                                <option value={'15m'}>15m</option>
                                <option value={'5m'}>5m</option>
                                <option value={'1m'}>1m</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                    <Box component="form" sx={{ width: '25ch' }}>
                        <FormControl fullWidth>
                            <InputLabel
                                variant="standard"
                                htmlFor="uncontrolled-native"
                            >
                                Stable coin
                            </InputLabel>
                            <NativeSelect
                                inputProps={{
                                    name: 'Stable coin',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                <option value={'USDT'}>USDT</option>
                                <option value={'BSUD'}>BSUD</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            inputProps={{
                                max: '50',
                                min: '0',
                            }}
                            id="window-length"
                            label="Window length"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        border: '2px solid #f7d759',
                        borderRadius: '10px',
                        marginLeft: '25px',
                        marginRight: '25px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    marginTop: '15px',
                                    marginBottom: '15px',
                                    marginLeft: '0px',
                                    paddingLeft: '25px',
                                }}
                            >
                                All Binance Spot Market tokens
                            </Typography>
                        </Box>
                        <Box>
                            <SearchBar />
                        </Box>
                    </Box>
                    <Divider orientation="horizontal" />
                    <Box
                        sx={{
                            height: '55vh',
                            overflow: 'scroll',
                            marginTop: '15px',
                            padding: '25px',
                        }}
                    >
                        <InputTickers />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export const settingsLoader = async () => {
    // do API call to lambda backend endpoint to retrieve all Binance SPOT MARKET tokens names
    // inmediately before the SettingPage is loaded. The the customer chose which tokens to get info from.
    try {
        // USDT by default but later on the user must be able to choose between USDT or BUSD or any other one
        const dataLocal = localStorage.getItem('allSpotTickerNames')
        if (dataLocal) {
            console.log('data from local storage')
            const dataLocalResponse = { data: JSON.parse(dataLocal) }
            return dataLocalResponse
        } else {
            const response = await axios.get(
                'https://jxd8645qp7.execute-api.ap-northeast-1.amazonaws.com/dev/allSpotTickerNames?stableCoinName=USDT'
            )
            localStorage.setItem(
                'allSpotTickerNames',
                JSON.stringify(response.data)
            )
            return response
        }
    } catch (err) {
        throw json({ data: 'error while retrieving all spot token names info' })
    }
}
