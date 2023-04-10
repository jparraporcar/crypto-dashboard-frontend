import { Box } from '@mui/material'
import { ChartData } from 'chart.js'
import React, { useEffect, useRef, useState } from 'react'
import { TNamedCandles, TNamedCandlesT } from '../../types'
import {
    divideVectors,
    getVectorsAverage,
    namedCandlesDataWindowToNormVectorOfConstants,
    transformFromT,
} from '../../utils'
import { ChartCustom } from '../common/ChartCustom/ChartCustom'
import { NavBar } from '../common/NavBar/NavBar'

// modifications log:
// -> retrieve data every minute, which is the least candle interval that can be retrieved

export const MultiplePVDataPage: React.FC = (): JSX.Element => {
    const [candlesData, setcandlesData] = useState<TNamedCandles[]>([])
    const isInitialized = useRef<boolean>(false)
    const timerRef = useRef<NodeJS.Timer>()
    const [fetchCounter, setFetchCounter] = useState<number>(0)
    const [normCandle, setNormCandle] = useState<TNamedCandles[]>([])
    const [chartVolumeData, setChartVolumeData] =
        useState<ChartData<'bar', number[]>>()
    const [chartPriceData, setChartPriceData] =
        useState<ChartData<'bar', number[]>>()
    const [chartMavgVolumeData, setChartMavgVolumeData] =
        useState<ChartData<'bar', number[]>>()
    const [chartMavgPriceData, setChartMavgPriceData] =
        useState<ChartData<'bar', number[]>>()
    const [namedCandlesDataWindow, setNamedCandlesDataWindow] = useState<
        TNamedCandles[]
    >([])
    const [multiplePriceAvg, setMultiplePriceAvg] = useState<number[]>([])
    const [multipleVolumeAvg, setMultipleVolumeAvg] = useState<number[]>([])

    useEffect(() => {
        if (isInitialized.current) {
            return
        } else {
            isInitialized.current = true
            const fetchData = async () => {
                const data = await fetch(
                    'https://jxd8645qp7.execute-api.ap-northeast-1.amazonaws.com/dev/priceVolumeData?stableCoinName=USDT&interval=1m'
                )
                const dataParsed = (await data.json()) as TNamedCandles[]
                if (dataParsed) {
                    setcandlesData(dataParsed)
                }
            }
            const fetchDataWindow = async () => {
                const data = await fetch(
                    'https://jxd8645qp7.execute-api.ap-northeast-1.amazonaws.com/dev/priceVolumeDataWindow?stableCoinName=USDT&interval=1m&windowLength=40'
                )
                const dataParsed = (await data.json()) as TNamedCandlesT[]
                if (dataParsed) {
                    setNamedCandlesDataWindow(transformFromT(dataParsed))
                }
            }
            try {
                // execute fetchData functions without delay first time
                fetchData()
                fetchDataWindow()
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
                    fetchDataWindow()
                }, 60000)
            } catch (err) {
                console.log(err)
                setTimeout(async () => {
                    console.log('waiting 40s to send next request')
                    await fetchData()
                }, 30000)
            }
        }
    }, [isInitialized.current])

    useEffect(() => {
        if (fetchCounter === 0 && candlesData.length > 0) {
            setFetchCounter((prevState) => prevState + 1)
            setNormCandle(candlesData)
        }
    }, [fetchCounter, candlesData])

    useEffect(() => {
        if (candlesData.length > 0 && normCandle.length > 0) {
            setChartVolumeData({
                labels: Object.keys(candlesData[0]).sort(),
                datasets: [
                    {
                        label: 'Volume',
                        data: divideVectors(
                            Object.keys(candlesData[0])
                                .sort()
                                .map((key) =>
                                    Number(candlesData[0][key].quoteVolume)
                                ),
                            Object.keys(normCandle[0])
                                .sort()
                                .map((key) =>
                                    Number(normCandle[0][key].quoteVolume)
                                )
                        ),
                        backgroundColor: '#f7d759',
                    },
                ],
            })
            setChartPriceData({
                labels: Object.keys(candlesData[0]).sort(),
                datasets: [
                    {
                        label: 'Price',
                        data: divideVectors(
                            Object.keys(candlesData[0])
                                .sort()
                                .map((key) =>
                                    Number(candlesData[0][key].close)
                                ),
                            Object.keys(normCandle[0])
                                .sort()
                                .map((key) => Number(normCandle[0][key].close))
                        ),
                        backgroundColor: '#f7d759',
                    },
                ],
            })
        }
    }, [candlesData, normCandle])

    useEffect(() => {
        if (namedCandlesDataWindow.length > 0) {
            const vArrayWindowMultiplesVolume =
                namedCandlesDataWindowToNormVectorOfConstants(
                    namedCandlesDataWindow,
                    namedCandlesDataWindow[0],
                    'quoteVolume'
                )
            setMultipleVolumeAvg(getVectorsAverage(vArrayWindowMultiplesVolume))

            const vArrayWindowMultiplesPrice =
                namedCandlesDataWindowToNormVectorOfConstants(
                    namedCandlesDataWindow,
                    namedCandlesDataWindow[0],
                    'close'
                )
            setMultiplePriceAvg(getVectorsAverage(vArrayWindowMultiplesPrice))
        }
    }, [namedCandlesDataWindow, normCandle])

    useEffect(() => {
        if (
            multiplePriceAvg.length > 0 &&
            multipleVolumeAvg.length > 0 &&
            candlesData.length > 0
        ) {
            setChartMavgPriceData({
                labels: Object.keys(candlesData[0]).sort(),
                datasets: [
                    {
                        label: 'Multiple of price average',
                        data: multiplePriceAvg,
                        backgroundColor: '#f7d759',
                    },
                ],
            })
            setChartMavgVolumeData({
                labels: Object.keys(candlesData[0]).sort(),
                datasets: [
                    {
                        label: 'Multiple of volume average',
                        data: multipleVolumeAvg,
                        backgroundColor: '#f7d759',
                    },
                ],
            })
        }
    }, [candlesData, multiplePriceAvg, multipleVolumeAvg])

    return (
        <Box
            component="div"
            sx={{
                position: 'relative',
                width: '100vw',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <NavBar mainTitle="Volume and Price Statistics" />
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    position: 'absolute',
                    top: '57px',
                    width: '100vw',
                    padding: '30px',
                    height: '100%',
                }}
            >
                {chartPriceData && chartVolumeData ? (
                    <>
                        <Box component="div">
                            <ChartCustom dataChart={chartVolumeData} />
                        </Box>
                        <Box component="div">
                            <ChartCustom dataChart={chartPriceData} />
                        </Box>
                    </>
                ) : (
                    <div>...LOADING ABSOLUTE</div>
                )}
                {chartMavgPriceData && chartMavgVolumeData ? (
                    <>
                        <Box component="div">
                            <ChartCustom dataChart={chartMavgPriceData} />
                        </Box>
                        <Box component="div">
                            <ChartCustom dataChart={chartMavgVolumeData} />
                        </Box>
                    </>
                ) : (
                    <div>...LOADING AVERAGES</div>
                )}
            </Box>
        </Box>
    )
}
