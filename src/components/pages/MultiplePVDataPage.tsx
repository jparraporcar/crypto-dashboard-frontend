import { Box } from '@mui/material'
import { ChartData } from 'chart.js'
import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { TNamedCandles, TNamedCandlesT } from '../../types'
import {
    divideVectors,
    getPairsNames,
    getVectorsAverage,
    namedCandlesDataWindowToNormVectorOfConstants,
    transformFromT,
} from '../../utils'
import { ChartCustom } from '../common/ChartCustom/ChartCustom'
import { NavBar } from '../common/NavBar/NavBar'
import { Hourglass } from '../common/Hourglass/Hourglass'
import { MenuPVData } from '../common/MenuPVData/MenuPVData'

export const MultiplePVDataPage: React.FC = (): JSX.Element => {
    const [candlesData, setcandlesData] = useState<TNamedCandles[]>([])
    const timerRef = useRef<NodeJS.Timer>()
    const [fetchCounter, setFetchCounter] = useState<number>(0)
    const [normCandle, setNormCandle] = useState<TNamedCandles[]>([])
    const [chartVolumeData, setChartVolumeData] =
        useState<ChartData<'bar', number[]>>()
    const [chartPriceData, setChartPriceData] =
        useState<ChartData<'bar', number[]>>()
    const [chartVolumePriceData, setChartVolumePriceData] =
        useState<ChartData<'bar', number[]>>()
    const [chartMavgVolumeData, setChartMavgVolumeData] =
        useState<ChartData<'bar', number[]>>()
    const [chartMavgPriceData, setChartMavgPriceData] =
        useState<ChartData<'bar', number[]>>()
    const [chartMavgVolumePriceData, setChartMavgVolumePriceData] =
        useState<ChartData<'bar', number[]>>()
    const [namedCandlesDataWindow, setNamedCandlesDataWindow] = useState<
        TNamedCandles[]
    >([])
    const [multiplePriceAvg, setMultiplePriceAvg] = useState<number[]>([])
    const [multipleVolumeAvg, setMultipleVolumeAvg] = useState<number[]>([])
    const [multipleVolumePriceAvg, setMultipleVolumePriceAvg] = useState<
        number[]
    >([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const settingsState = useAppSelector((state) => state.tickers.settings)
    const pairsNames = getPairsNames(settingsState)
    const chartViewState = useAppSelector((state) => state.layout.chartView)

    useEffect(() => {
        const fetchData = async () => {
            // DEVELOPMENT REMOTE
            const data = await fetch(
                `https://jxd8645qp7.execute-api.ap-northeast-1.amazonaws.com/dev/priceVolumeData?interval=${
                    settingsState.interval
                }&symbols=${JSON.stringify(pairsNames)}`
            )
            // DEVELOPMENT REMOTE

            // DEVELOPMENT LOCAL
            // const data = await fetch(
            //     `http://localhost:4000/dev/priceVolumeData?stableCoinName=${
            //         settingsState.stableCoin
            //     }&interval=${settingsState.interval}&symbols=${JSON.stringify(
            //         pairsNames
            //     )}`
            // )
            // DEVELOPMENT LOCAL
            const dataParsed = (await data.json()) as TNamedCandles[]
            if (dataParsed) {
                console.log('nowindow', dataParsed)
                setcandlesData(dataParsed)
            }
        }
        const fetchDataWindow = async () => {
            // DEVELOPMENT REMOTE
            const data = await fetch(
                `https://jxd8645qp7.execute-api.ap-northeast-1.amazonaws.com/dev/priceVolumeDataWindow?interval=${
                    settingsState.interval
                }&windowLength=${
                    settingsState.windowLength
                }&symbols=${JSON.stringify(pairsNames)}`
            )
            // DEVELOPMENT REMOTE

            // DEVELOPMENT LOCAL
            // const fetchDataWindow = async () => {
            //     const data = await fetch(
            //         `http://localhost:4000/dev/priceVolumeDataWindow?interval=${settingsState.interval}&windowLength=${
            //             settingsState.windowLength
            //         }&symbols=${JSON.stringify(pairsNames)}`
            //     )
            // DEVELOPMENT LOCAL

            const dataParsed = (await data.json()) as TNamedCandlesT[]
            if (dataParsed) {
                console.log('window', dataParsed)
                setNamedCandlesDataWindow(transformFromT(dataParsed))
            }
        }
        try {
            // execute fetchData functions without delay first time
            console.log('effect is running')
            setIsLoading(true)
            fetchData()
            fetchDataWindow()
            setIsLoading(false)
            const intervalMilliseconds =
                Number(settingsState.interval.replace('m', '')) * 60 * 1000
            console.log(settingsState.interval, intervalMilliseconds)
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
            }, intervalMilliseconds)
        } catch (err) {
            console.log(err)
            setTimeout(async () => {
                console.log('waiting 40s to send next request')
                await fetchData()
            }, 30000)
        }

        return () => {
            clearInterval(timerRef.current)
        }
    }, [])

    useEffect(() => {
        if (fetchCounter === 0 && candlesData.length > 0) {
            setFetchCounter((prevState) => prevState + 1)
            setNormCandle(candlesData)
        }
    }, [fetchCounter, candlesData])

    useEffect(() => {
        if (candlesData.length > 0 && normCandle.length > 0) {
            const v1 = divideVectors(
                Object.keys(candlesData[0])
                    .sort()
                    .map((key) => Number(candlesData[0][key].quoteVolume)),
                Object.keys(normCandle[0])
                    .sort()
                    .map((key) => Number(normCandle[0][key].quoteVolume))
            )
            const v2 = divideVectors(
                Object.keys(candlesData[0])
                    .sort()
                    .map((key) => Number(candlesData[0][key].close)),
                Object.keys(normCandle[0])
                    .sort()
                    .map((key) => Number(normCandle[0][key].close))
            )
            setChartVolumeData({
                labels: Object.keys(candlesData[0]).sort(),
                datasets: [
                    {
                        label: 'Multiple of volume',
                        data: v1,
                        backgroundColor: '#f7d759',
                    },
                ],
            })
            setChartPriceData({
                labels: Object.keys(candlesData[0]).sort(),
                datasets: [
                    {
                        label: 'Returns',
                        data: v2,
                        backgroundColor: '#f7d759',
                    },
                ],
            })
            setChartVolumePriceData({
                labels: Object.keys(candlesData[0]).sort(),
                datasets: [
                    {
                        label: 'Multiple of volume / returns',
                        data: divideVectors(v1, v2),
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
            setMultipleVolumePriceAvg(
                divideVectors(multipleVolumeAvg, multiplePriceAvg)
            )
        }
    }, [namedCandlesDataWindow, normCandle])

    useEffect(() => {
        if (
            multiplePriceAvg.length > 0 &&
            multipleVolumeAvg.length > 0 &&
            candlesData.length > 0
        ) {
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
            setChartMavgPriceData({
                labels: Object.keys(candlesData[0]).sort(),
                datasets: [
                    {
                        label: 'Average returns',
                        data: multiplePriceAvg,
                        backgroundColor: '#f7d759',
                    },
                ],
            })

            setChartMavgVolumePriceData({
                labels: Object.keys(candlesData[0]).sort(),
                datasets: [
                    {
                        label: 'Multiple of volume average / Average returns',
                        data: multipleVolumePriceAvg,
                        backgroundColor: '#f7d759',
                    },
                ],
            })
        }
    }, [
        candlesData,
        multipleVolumeAvg,
        multiplePriceAvg,
        multipleVolumePriceAvg,
    ])

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
            <NavBar
                mainTitle={`Volume and Price Statistics: interval ${settingsState.interval} / window length: ${settingsState.windowLength}`}
                menuContent={<MenuPVData />}
                position="fixed"
                zIndex={2000}
                top={0}
            />
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
                {isLoading ? (
                    <Box>
                        <Hourglass />
                    </Box>
                ) : (
                    <>
                        {chartViewState.multipleOfVolume && chartVolumeData && (
                            <Box component="div">
                                <ChartCustom dataChart={chartVolumeData} />
                            </Box>
                        )}
                        {chartViewState.multipleOfPrice && chartPriceData && (
                            <Box component="div">
                                <ChartCustom dataChart={chartPriceData} />
                            </Box>
                        )}
                        {chartViewState.multipleOfVolumePrice &&
                            chartVolumePriceData && (
                                <Box component="div">
                                    <ChartCustom
                                        dataChart={chartVolumePriceData}
                                    />
                                </Box>
                            )}
                        {chartViewState.multipleOfVolumeAvg &&
                            chartMavgVolumeData && (
                                <Box component="div">
                                    <ChartCustom
                                        dataChart={chartMavgVolumeData}
                                    />
                                </Box>
                            )}
                        {chartViewState.multipleOfPriceAvg &&
                            chartMavgPriceData && (
                                <Box component="div">
                                    <ChartCustom
                                        dataChart={chartMavgPriceData}
                                    />
                                </Box>
                            )}
                        {chartViewState.multipleOfVolumePriceAvg &&
                            chartMavgVolumePriceData && (
                                <Box component="div">
                                    <ChartCustom
                                        dataChart={chartMavgVolumePriceData}
                                    />
                                </Box>
                            )}
                    </>
                )}
            </Box>
        </Box>
    )
}
