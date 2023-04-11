import { Box, SxProps } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { json } from 'react-router-dom'
import { InputSettings } from '../common/InputSettings/InputSettings'
import { NavBar } from '../common/NavBar/NavBar'

export const SettingsPage: React.FC = (): JSX.Element => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
            }}
        >
            <NavBar mainTitle="User personal settings" />
            <Box
                sx={{
                    position: 'absolute',
                    top: '40px',
                    width: '100vw',
                    height: 'calc(100vh - 40px)',
                }}
            >
                <InputSettings />
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
