import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TNamedCandle } from '../../types'
import { ChartCustom } from '../common/ChartCustom/ChartCustom'
import { NavBar } from '../common/NavBar/NavBar'

export const PriceAndVolumeDataPage: React.FC = (): JSX.Element => {
    // const [sortedVolume, setSortedPrice] = useState<TNamedCandle[]>([])
    // const [sortedPrice, setSortedPrice] = useState<TNamedCandle[]>([])
    const [test, setTest] = useState<TNamedCandle[]>([])

    useEffect(() => {
        const today = new Date()
        const time =
            today.getHours() +
            ':' +
            today.getMinutes() +
            ':' +
            today.getSeconds()
        console.log(`inside use effect at time: ${time}`)
        const fetchData = async () => {
            const data = await fetch(
                'http://localhost:8081/priceVolumeData?stableCoinName=BUSD&interval=1m'
            )
            const dataParsed = await data.json()
            setTest(dataParsed)
        }
        const timer = setInterval(async () => await fetchData(), 60000)

        return () => clearInterval(timer)
    }, [])
    console.log(test)
    return (
        <Box
            sx={{
                backgroundColor: '#f7d759',
                border: '1px solid grey',
                position: 'relative',
            }}
        >
            <NavBar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    position: 'absolute',
                    top: '56px',
                    width: '100%',
                    padding: '30px',
                    height: 'calc(100vh - 57px)',
                }}
            >
                <Box>
                    <ChartCustom />
                </Box>
                <Box>
                    <ChartCustom />
                </Box>
            </Box>
        </Box>
    )
}
