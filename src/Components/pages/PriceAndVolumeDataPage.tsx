import { Box } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import {
    CandleChartResult,
    TPriceVector,
    TNamedCandles,
    TVolumeVector,
} from '../../types'
import { ChartCustom } from '../common/ChartCustom/ChartCustom'
import { NavBar } from '../common/NavBar/NavBar'

export const PriceAndVolumeDataPage: React.FC = (): JSX.Element => {
    const [candlesData, setcandlesData] = useState<TNamedCandles[]>([])
    const isInitialized = useRef<boolean>(false)
    const timerRef = useRef<NodeJS.Timer>()
    const [fetchCounter, setFetchCounter] = useState<number>(0)
    const [normCandle, setNormCandle] = useState<TNamedCandles[]>([])
    const [chartVolumeData, setChartVolumeData] = useState<any>()
    const [chartPriceData, setChartPriceData] = useState<any>()
    const [chartMavgVolumeData, setChartMavgVolumeData] = useState<any>()
    const [chartMavgPriceData, setChartMavgPriceData] = useState<any>()
    const [namedCandlesDataWindow, setNamedCandlesDataWindow] = useState<
        TNamedCandles[]
    >([])
    const [multiplePriceAvg, setMultiplePriceAvg] = useState<number[]>([])
    const [multipleVolumeAvg, setMultipleVolumeAvg] = useState<number[]>([])

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
                setcandlesData(dataParsed)
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
                }, 40000)
            } catch (err) {
                setTimeout(async () => {
                    console.log('waiting 40s to send next request')
                    await fetchData()
                }, 40000)
            }
        }
    }, [isInitialized.current])

    useEffect(() => {
        console.log('inside useffect 2')
        if (fetchCounter === 0 && candlesData.length > 0) {
            setFetchCounter((prevState) => prevState + 1)
            setNormCandle(candlesData)
        }
    }, [fetchCounter, candlesData])

    useEffect(() => {
        console.log('inside useffect 3')
        if (candlesData.length > 0 && normCandle.length > 0) {
            setChartVolumeData({
                labels: Object.keys(candlesData[0]),
                datasets: [
                    {
                        label: 'Volume',
                        data: divideVectors(
                            Object.values(candlesData[0]).map((el) =>
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
                labels: Object.keys(candlesData[0]),
                datasets: [
                    {
                        label: 'Price',
                        data: divideVectors(
                            Object.values(candlesData[0]).map((el) =>
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
    }, [candlesData, normCandle])

    useEffect(() => {
        console.log('inside useEffect 4')
        if (candlesData.length > 0) {
            setNamedCandlesDataWindow((prevState: TNamedCandles[]) => {
                let newState
                if (prevState.length < 100) {
                    // rolling window still not full
                    newState = [...prevState]
                    newState.push(candlesData[0]) // extract the object of type TNamedCandles from the backend 'wrapping array'
                } else {
                    newState = [...prevState]
                    newState.push(candlesData[0])
                    newState.shift()
                }
                return newState
            })
        }
    }, [candlesData])

    useEffect(() => {
        console.log('inside useEffect 5')
        if (namedCandlesDataWindow.length == 100) {
            const vArrayVolume = namedCandlesDataWindowToVectorsOfConstants(
                namedCandlesDataWindow,
                normCandle,
                'quoteAssetVolume'
            )
            setMultipleVolumeAvg(getVectorsAverage(vArrayVolume))

            const vArrayPrice = namedCandlesDataWindowToVectorsOfConstants(
                namedCandlesDataWindow,
                normCandle,
                'close'
            )
            setMultiplePriceAvg(getVectorsAverage(vArrayPrice))
        }
    }, [namedCandlesDataWindow])

    useEffect(() => {
        console.log('inside useffect 6', candlesData)
        if (
            multiplePriceAvg.length > 0 &&
            multipleVolumeAvg.length > 0 &&
            candlesData.length > 0
        ) {
            setChartMavgPriceData({
                labels: Object.keys(candlesData[0]),
                datasets: [
                    {
                        label: 'Multiple of price average',
                        data: multiplePriceAvg,
                        backgroundColor: '#f7d759',
                    },
                ],
            })
            setChartMavgVolumeData({
                labels: Object.keys(candlesData[0]),
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

    function namedCandlesDataWindowToVectorsOfConstants(
        namedCandles: TNamedCandles[],
        namedCandlesNorm: TNamedCandles[],
        prop: keyof CandleChartResult
    ) {
        const result: TPriceVector[] | TVolumeVector[] = []
        const norm = Object.values(namedCandlesNorm[0]).map(
            (candle: CandleChartResult) => {
                return Number(candle[`${prop}`])
            }
        )
        for (let i = 0; i < namedCandles.length; i++) {
            const v = Object.values(namedCandles[i]).map(
                (candle: CandleChartResult) => {
                    return Number(candle[`${prop}`])
                }
            )
            result.push(divideVectors(v, norm))
        }
        return result
    }

    function divideVectors(v1: number[], v2: number[]) {
        if (v1.length !== v2.length) {
            throw new Error('Vectors must have equal length')
        }

        const result = []
        for (let i = 0; i < v1.length; i++) {
            result.push(v1[i] / v2[i])
        }
        return result
    }

    function sumVectors(v1: number[], v2: number[]) {
        if (v1.length !== v2.length) {
            throw new Error('Vectors must have equal length')
        }

        const result = []
        for (let i = 0; i < v1.length; i++) {
            result.push(v1[i] + v2[i])
        }
        return result
    }

    function initializeArray(length: number, constant: number) {
        const ArrayZeros = new Array(length)
        for (let i = 0; i < ArrayZeros.length; i++) {
            ArrayZeros[i] = constant
        }
        return ArrayZeros
    }

    function getVectorsAverage(vArray: TPriceVector[] | TVolumeVector[]) {
        let vAcumRes = initializeArray(vArray[0].length, 0)
        const vLength = initializeArray(vArray[0].length, vArray.length)
        for (let i = 0; i < vArray.length; i++) {
            const vActual = vArray[i]
            vAcumRes = sumVectors(vAcumRes, vActual)
        }
        return divideVectors(vAcumRes, vLength)
    }

    console.log(multiplePriceAvg)
    console.log(multipleVolumeAvg)

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
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    position: 'absolute',
                    top: '57px',
                    width: '100%',
                    padding: '30px',
                    height: '100%',
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
                    <div>...LOADING ABSOLUTE</div>
                )}
                {chartMavgPriceData && chartMavgVolumeData ? (
                    <>
                        <Box>
                            <ChartCustom dataChart={chartMavgPriceData} />
                        </Box>
                        <Box>
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
