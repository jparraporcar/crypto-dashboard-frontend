import {
    Box,
    Button,
    Divider,
    Fab,
    FormControl,
    InputLabel,
    NativeSelect,
    TextField,
    Typography,
    useMediaQuery,
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
    setIsAllowedForward,
    setSnackbarCustom,
} from '../../app/slices/layoutSlice'
import { setSettings } from '../../app/slices/tickersSlice'
import { CandleChartInterval_LT } from '../../types'
import { InputTickers } from '../common/InputTickers/InputTickers'
import { NavBar } from '../common/NavBar/NavBar'
import { SearchBar } from '../common/SearchBar/SearchBar'
import { MenuGeneric } from '../common/MenuGeneric/MenuGeneric'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export const SettingsPage: React.FC = (): JSX.Element => {
    const [windowLengthError, setWindowLengthError] = useState<
        | {
              error: boolean
              message: string
          }
        | undefined
    >(undefined)
    const dispatch = useAppDispatch()
    const settingsState = useAppSelector((state) => state.tickers.settings)
    const snackbarCustomState = useAppSelector((state) => state.layout.snackbar)
    const navigate = useNavigate()
    const isMobile = useMediaQuery('(max-width: 600px)')
    const isAllowedForwardState = useAppSelector(
        (state) => state.layout.isAllowedForward
    )

    const handleIntervalChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        dispatch(
            setSettings({
                ...settingsState,
                ['interval']: event.target.value as CandleChartInterval_LT,
            })
        )
    }

    const handleWindowLengthBlur = (
        event: React.FocusEvent<HTMLInputElement>
    ) => {
        if (event.target.value === '') {
            setWindowLengthError({
                error: true,
                message: 'it cannot be empty',
            })
        }
    }

    const handleWindowLengthChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (Number(event.target.value) > 50) {
            setWindowLengthError({
                error: true,
                message: 'No greater than 50',
            })
            return
        } else if (event.target.value === '') {
            setWindowLengthError({
                error: true,
                message: 'it cannot be empty',
            })
        } else {
            setWindowLengthError(undefined)
        }
        dispatch(
            setSettings({
                ...settingsState,
                ['windowLength']: Number(event.target.value),
            })
        )
    }

    const handleAcceptSettings = () => {
        if (
            !settingsState.symbolsListSelected ||
            windowLengthError !== undefined
        ) {
            dispatch(
                setSnackbarCustom({
                    ...snackbarCustomState,
                    isOpen: true,
                    message:
                        'At least 5 symbols must be chosen / window length must be less than 50 / window length cannot be empty ',
                    severity: 'error',
                    autoHideDuration: 3000,
                })
            )
            return
        } else if (
            settingsState.symbolsListSelected.length < 5 ||
            windowLengthError !== undefined
        ) {
            dispatch(
                setSnackbarCustom({
                    ...snackbarCustomState,
                    isOpen: true,
                    message:
                        'At least 5 symbols must be chosen / window length must be less than 50 / window length cannot be empty ',
                    severity: 'error',
                    autoHideDuration: 3000,
                })
            )
            return
        }
        dispatch(setIsAllowedForward(true))
        navigate('/multiplePVData', { state: '/multiplePVData' })
    }
    console.log('isAllowedForwardState', isAllowedForwardState)
    return (
        <Box
            id="settings-outer1"
            sx={{
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            <Box>
                <NavBar
                    mainTitle="User personal settings"
                    menuContent={<MenuGeneric />}
                    position="static"
                    zIndex={2000}
                />
            </Box>
            {isMobile && (
                <Fab
                    sx={{
                        position: 'fixed',
                        top: '40px',
                        left: 'calc(100% - 45px)',
                        marginTop: '5px',
                    }}
                    color="primary"
                    aria-label="add"
                    size="small"
                    disabled={!isAllowedForwardState}
                    onClick={() => navigate(1)}
                >
                    <ArrowForwardIcon />
                </Fab>
            )}
            <Box
                id="settings-outer2"
                sx={{
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <Box
                    id="settings-outer3-1"
                    sx={{
                        height: '25vh',
                        padding: '25px 25px 25px 25px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end',
                    }}
                >
                    <Box
                        id="settings-outer4"
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-evenly',
                            width: '180px',
                        }}
                    >
                        <Box component="form">
                            <FormControl fullWidth>
                                <InputLabel
                                    variant="standard"
                                    htmlFor="uncontrolled-native"
                                >
                                    Time frame
                                </InputLabel>
                                <NativeSelect
                                    value={settingsState.interval}
                                    inputProps={{
                                        name: 'Time frame',
                                        id: 'uncontrolled-native',
                                    }}
                                    onChange={handleIntervalChange}
                                >
                                    <option value={'1m'}>1m</option>
                                    <option value={'3m'}>3m</option>
                                    <option value={'5m'}>5m</option>
                                    <option value={'15m'}>15m</option>
                                    <option value={'30m'}>30m</option>
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
                                value={settingsState.windowLength}
                                error={
                                    windowLengthError && windowLengthError.error
                                }
                                helperText={
                                    windowLengthError &&
                                    windowLengthError.message
                                }
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
                                onChange={handleWindowLengthChange}
                                onBlur={handleWindowLengthBlur}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ marginLeft: '40px' }}>
                        <Button
                            variant="contained"
                            onClick={handleAcceptSettings}
                        >
                            Accept settings
                        </Button>
                    </Box>
                </Box>
                <Box
                    id="settings-outer3-2"
                    sx={{
                        border: '2px solid #f7d759',
                        borderRadius: '10px',
                        marginLeft: '25px',
                        marginRight: '25px',
                        height: '60vh',
                        overflow: 'hidden',
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
                                All Binance Spot Market USDT pairs
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
                            padding: '15px 25px 25px 25px',
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
    // do API call to lambda backend endpoint to retrieve all Binance SPOT MARKET symbols names WITH STATUS 'TRADING' and USDT pairs
    // inmediately before the SettingPage is loaded. The the customer chose which symbols to get info from.
    try {
        // USDT by default but later on the user must be able to choose between USDT or BUSD or any other one
        const dataLocal = localStorage.getItem('allSpotTickerNames')
        if (dataLocal) {
            console.log('data from local storage')
            const dataLocalResponse = { data: JSON.parse(dataLocal) }
            return dataLocalResponse
        } else {
            // DEVELOPMENT REMOTE
            const response = await axios.get(
                'https://jxd8645qp7.execute-api.ap-northeast-1.amazonaws.com/dev/allSpotTickerNames?stableCoinName=USDT'
            )
            // DEVELOPMENT REMOTE

            // DEVELOPMENT LOCAL
            // const response = await axios.get(
            //     'http://localhost:4000/dev/allSpotTickerNames?stableCoinName=USDT'
            // )
            // DEVELOPMENT LOCAL

            localStorage.setItem(
                'allSpotTickerNames',
                JSON.stringify(response.data.sort())
            )
            return response
        }
    } catch (err) {
        throw json({ data: 'error while retrieving all spot token names info' })
    }
}
