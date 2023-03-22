import { Box } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { TNamedCandle } from '../../types'
import { ChartCustom } from '../common/ChartCustom/ChartCustom'
import { NavBar } from '../common/NavBar/NavBar'
import { divide } from 'mathjs'

export const PriceAndVolumeDataPage: React.FC = (): JSX.Element => {
    const [candleData, setCandleData] = useState<TNamedCandle[]>([])
    const isInitialized = useRef<boolean>(false)
    const timerRef = useRef<NodeJS.Timer>()
    const [fetchCounter, setFetchCounter] = useState<number>(0)
    const [normCandle, setNormCandle] = useState<TNamedCandle[]>([])
    const [chartVolumeData, setChartVolumeData] = useState<any>()
    const [chartPriceData, setChartPriceData] = useState<any>()

    useEffect(() => {
        if (isInitialized.current) {
            return
        } else {
            console.log('inside useffect 1')
            isInitialized.current = true
            const fetchData = async () => {
                const data = await fetch(
                    'http://localhost:8081/priceVolumeData?stableCoinName=BUSD&interval=1m'
                )
                const dataParsed = await data.json()
                console.log(dataParsed)
                setCandleData(dataParsed)
            }
            try {
                timerRef.current = setInterval(() => {
                    const today = new Date()
                    const time =
                        today.getHours() +
                        ':' +
                        today.getMinutes() +
                        ':' +
                        today.getSeconds()
                    console.log(`fetching data at time:${time}`)
                    fetchData()
                }, 30000)
            } catch (err) {
                setTimeout(async () => {
                    console.log('waiting 20s to send next request')
                    await fetchData()
                }, 20000)
            }
        }
    }, [isInitialized.current])

    useEffect(() => {
        console.log('inside useffect 2')
        if (fetchCounter === 0 && candleData.length > 0) {
            setFetchCounter((prevState) => prevState + 1)
            setNormCandle(candleData)
        }
    }, [fetchCounter, candleData])

    useEffect(() => {
        console.log('inside useffect 3')
        if (candleData.length > 0 && normCandle.length > 0) {
            setChartVolumeData({
                labels: Object.keys(candleData[0]),
                datasets: [
                    {
                        label: 'Volume',
                        data: divideVectors(
                            Object.values(candleData[0]).map((el) =>
                                Number(el.quoteAssetVolume)
                            ),
                            Object.values(normCandle[0]).map((el) =>
                                Number(el.quoteAssetVolume)
                            )
                        ),
                        backgroundColor: '#f7d759',
                    },
                ],
            })
            setChartPriceData({
                labels: Object.keys(candleData[0]),
                datasets: [
                    {
                        label: 'Price',
                        data: divideVectors(
                            Object.values(candleData[0]).map((el) =>
                                Number(el.close)
                            ),
                            Object.values(normCandle[0]).map((el) =>
                                Number(el.close)
                            )
                        ),
                        backgroundColor: '#f7d759',
                    },
                ],
            })
        }
    }, [candleData, normCandle])

    function divideVectors(v1: any, v2: any) {
        if (v1.length !== v2.length) {
            throw new Error('Vectors must have equal length')
        }

        const result = []
        for (let i = 0; i < v1.length; i++) {
            result.push(v1[i] / v2[i])
        }
        return result
    }
    console.log(chartPriceData)
    console.log(chartVolumeData)

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
                {chartPriceData && chartVolumeData ? (
                    <>
                        <Box>
                            <ChartCustom dataChart={chartVolumeData} />
                        </Box>
                        <Box>
                            <ChartCustom dataChart={chartPriceData} />
                        </Box>
                    </>
                ) : (
                    <div>...LOADING</div>
                )}
            </Box>
        </Box>
    )
}
