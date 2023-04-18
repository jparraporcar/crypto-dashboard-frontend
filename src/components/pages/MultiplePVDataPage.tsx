import { Box, Fab, SxProps, Typography } from '@mui/material'
import { ChartData } from 'chart.js'
import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { TNamedCandles, TNamedCandlesT } from '../../types'
import {
    divideVectors,
    getVectorOfOpenTime,
    getVectorsAverage,
    namedCandlesDataWindowToNormVectorOfConstants,
    transformFromT,
} from '../../utils'
import { NavBar } from '../common/NavBar/NavBar'
import { Hourglass } from '../common/Hourglass/Hourglass'
import { MenuPVData } from '../common/MenuPVData/MenuPVData'
import { ChartCustomBar } from '../common/ChartCustom/ChartCustomBar'
import { ChartCustomLine } from '../common/ChartCustom/ChartCustomLine'
import { useLocation, useNavigate } from 'react-router-dom'
import { setIsLoading } from '../../app/slices/layoutSlice'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export const MultiplePVDataPage: React.FC = (): JSX.Element => {
    const [candlesData, setcandlesData] = useState<TNamedCandles[]>([])
    const timerRef = useRef<NodeJS.Timer>()
    const [fetchCounter, setFetchCounter] = useState<number>(0)
    const [normCandle, setNormCandle] = useState<TNamedCandles[]>([])
    const [chartVolumeData, setChartVolumeData] =
        useState<ChartData<'bar', number[], string>>()
    const [chartPriceData, setChartPriceData] =
        useState<ChartData<'bar', number[], string>>()
    useState<ChartData<'bar', number[], string>>()
    const [chartMavgVolumeData, setChartMavgVolumeData] =
        useState<ChartData<'bar', number[], string>>()
    const [chartMavgPriceData, setChartMavgPriceData] =
        useState<ChartData<'bar', number[], string>>()
    const [chartMavgVolumeDataEvol, setChartMavgVolumeDataEvol] =
        useState<ChartData<'line', number[], string>>()
    const [chartMavgPriceDataEvol, setChartMavgPriceDataEvol] =
        useState<ChartData<'line', number[], string>>()

    const [namedCandlesDataWindow, setNamedCandlesDataWindow] = useState<
        TNamedCandles[]
    >([])
    const [multiplePriceAvg, setMultiplePriceAvg] = useState<number[]>([])
    const [multipleVolumeAvg, setMultipleVolumeAvg] = useState<number[]>([])
    const [multipleVolumePriceAvg, setMultipleVolumePriceAvg] = useState<
        number[]
    >([])
    const settingsState = useAppSelector((state) => state.tickers.settings)
    const chartViewState = useAppSelector((state) => state.layout.chartView)
    const evolSymbolState = useAppSelector((state) => state.layout.evolSymbol)
    const isLoadingState = useAppSelector((state) => state.layout.isLoading)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const location = useLocation()
    useEffect(() => {
        console.log('inside useEffect')
        // handling the transition between /multiplePVData -> /settings and avoiding setting the state to true in each data refetch
        // at each scheduled interval since it is smoother not to see the loader in that scenario
        if (location.state === '/multiplePVData') {
            const newLocation = { ...location, state: {} }
            window.history.replaceState(
                null,
                '',
                newLocation.pathname + newLocation.search
            )
            console.log(isLoadingState, 'before dispatching true')
            dispatch(setIsLoading(true))
            console.log(isLoadingState, 'after dispatching true')
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            // DEVELOPMENT REMOTE
            const dataInst = await fetch(
                `https://jxd8645qp7.execute-api.ap-northeast-1.amazonaws.com/dev/priceVolumeData?interval=${
                    settingsState.interval
                }&symbols=${localStorage.getItem('pairsListSelected')}`
            )
            // DEVELOPMENT REMOTE

            // DEVELOPMENT LOCAL
            // const dataInst = await fetch(
            //     `http://localhost:4000/dev/priceVolumeData?interval=${
            //         settingsState.interval
            //     }&symbols=${localStorage.getItem('pairsListSelected')}`
            // )
            // DEVELOPMENT LOCAL

            // DEVELOPMENT REMOTE
            const dataWindow = await fetch(
                `https://jxd8645qp7.execute-api.ap-northeast-1.amazonaws.com/dev/priceVolumeDataWindow?interval=${
                    settingsState.interval
                }&windowLength=${
                    settingsState.windowLength
                }&symbols=${localStorage.getItem('pairsListSelected')}`
            )
            // DEVELOPMENT REMOTE

            // DEVELOPMENT LOCAL
            // const dataWindow = await fetch(
            //     `http://localhost:4000/dev/priceVolumeDataWindow?interval=${
            //         settingsState.interval
            //     }&windowLength=${
            //         settingsState.windowLength
            //     }&symbols=${localStorage.getItem('pairsListSelected')}`
            // )
            // DEVELOPMENT LOCAL

            const dataParsedWindow =
                (await dataWindow.json()) as TNamedCandlesT[]
            const dataParsedInst = (await dataInst.json()) as TNamedCandles[]

            if (dataParsedInst && dataParsedWindow) {
                setcandlesData(dataParsedInst)
                setNamedCandlesDataWindow(transformFromT(dataParsedWindow))
                dispatch(setIsLoading(false))
                console.log('setting isLoading to false')
            }
        }

        try {
            // execute fetchData functions without delay first time
            console.log('effect is running')
            fetchData()
            const intervalMilliseconds =
                Number(settingsState.interval.replace('m', '')) * 60 * 1000
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
        }
    }, [candlesData, normCandle])

    useEffect(() => {
        if (namedCandlesDataWindow.length > 0) {
            const vArrayWindowMultiplesAvgVolume =
                namedCandlesDataWindowToNormVectorOfConstants(
                    namedCandlesDataWindow,
                    namedCandlesDataWindow[0],
                    'quoteVolume'
                )
            setMultipleVolumeAvg(
                getVectorsAverage(vArrayWindowMultiplesAvgVolume)
            )

            const vArrayWindowMultiplesAvgPrice =
                namedCandlesDataWindowToNormVectorOfConstants(
                    namedCandlesDataWindow,
                    namedCandlesDataWindow[0],
                    'close'
                )
            setMultiplePriceAvg(
                getVectorsAverage(vArrayWindowMultiplesAvgPrice)
            )
            setMultipleVolumePriceAvg(
                divideVectors(multipleVolumeAvg, multiplePriceAvg)
            )
        }
    }, [namedCandlesDataWindow, normCandle])

    useEffect(() => {
        if (
            namedCandlesDataWindow.length > 0 &&
            evolSymbolState.chartIndex !== undefined
        ) {
            console.log(namedCandlesDataWindow)
            console.log(Object.keys(namedCandlesDataWindow[0]).length)
            console.log(evolSymbolState)
            const vOpenTime = getVectorOfOpenTime(namedCandlesDataWindow)
            console.log(vOpenTime)
            const vArrayWindowMultiplesAvgVolume =
                namedCandlesDataWindowToNormVectorOfConstants(
                    namedCandlesDataWindow,
                    namedCandlesDataWindow[0],
                    'quoteVolume'
                )
            const vArrayWindowMultiplesAvgPrice =
                namedCandlesDataWindowToNormVectorOfConstants(
                    namedCandlesDataWindow,
                    namedCandlesDataWindow[0],
                    'close'
                )
            setChartMavgVolumeDataEvol({
                labels: vOpenTime,
                datasets: [
                    {
                        label: `Multiple of volume window of ${evolSymbolState.chartSymbol}`,
                        data: vArrayWindowMultiplesAvgVolume.map(
                            (el) => el[evolSymbolState.chartIndex!]
                        ),
                        backgroundColor: '#f7d759',
                    },
                ],
            })
            setChartMavgPriceDataEvol({
                labels: vOpenTime,
                datasets: [
                    {
                        label: `Average returns window of ${evolSymbolState.chartSymbol}`,
                        data: vArrayWindowMultiplesAvgPrice.map(
                            (el) => el[evolSymbolState.chartIndex!]
                        ),
                        backgroundColor: '#f7d759',
                    },
                ],
            })
        }
    }, [evolSymbolState, namedCandlesDataWindow])

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
        }
    }, [
        candlesData,
        multipleVolumeAvg,
        multiplePriceAvg,
        multipleVolumePriceAvg,
    ])

    const sxChartContainer: SxProps = {
        position: 'relative',
        margin: 'auto',
        height: 'calc(50vh - 25px)',
        width: '75vw',
    }

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
                mainTitle={`V&P stats: ${settingsState.interval} / ${settingsState.windowLength} candles`}
                menuContent={<MenuPVData />}
                position="fixed"
                zIndex={2000}
                top={0}
            />
            <Fab
                sx={{
                    position: 'fixed',
                    top: '40px',
                    marginLeft: '5px',
                    marginTop: '5px',
                }}
                color="primary"
                aria-label="add"
                size="small"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon />
            </Fab>
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    position: 'absolute',
                    top: '40px',
                    width: '100vw',
                    padding: '0px 40px 30px 30px',
                    height: 'calc(100vh - 40px)',
                }}
            >
                {isLoadingState && (
                    <Box
                        sx={{ position: 'absolute', top: 'calc(50vh - 57px)' }}
                    >
                        <Hourglass />
                    </Box>
                )}
                {!isLoadingState &&
                    !chartViewState.multipleOfPrice &&
                    !chartViewState.multipleOfPriceAvg &&
                    !chartViewState.multipleOfVolume &&
                    !chartViewState.multipleOfVolumeAvg && (
                        <Box>
                            <Typography variant="h3">
                                Please choose a chart to show
                            </Typography>
                        </Box>
                    )}
                {chartViewState.multipleOfVolume && chartVolumeData && (
                    <Box component="div" sx={sxChartContainer}>
                        <ChartCustomBar dataChart={chartVolumeData} />
                    </Box>
                )}
                {chartViewState.multipleOfPrice && chartPriceData && (
                    <Box component="div" sx={sxChartContainer}>
                        <ChartCustomBar dataChart={chartPriceData} />
                    </Box>
                )}
                {chartViewState.multipleOfVolumeAvg && chartMavgVolumeData && (
                    <Box component="div" sx={sxChartContainer}>
                        <ChartCustomBar dataChart={chartMavgVolumeData} />
                    </Box>
                )}
                {chartViewState.multipleOfPriceAvg && chartMavgPriceData && (
                    <Box component="div" sx={sxChartContainer}>
                        <ChartCustomBar dataChart={chartMavgPriceData} />
                    </Box>
                )}
                {evolSymbolState.chartSymbol !== '' &&
                    (evolSymbolState.chartTitle === 'Multiple of volume' ||
                        evolSymbolState.chartTitle ===
                            'Multiple of volume average') &&
                    chartMavgVolumeDataEvol && (
                        <Box component="div" sx={sxChartContainer}>
                            <ChartCustomLine
                                dataChart={chartMavgVolumeDataEvol}
                            />
                        </Box>
                    )}
                {evolSymbolState.chartSymbol !== '' &&
                    (evolSymbolState.chartTitle === 'Returns' ||
                        evolSymbolState.chartTitle === 'Average returns') &&
                    chartMavgPriceDataEvol && (
                        <Box component="div" sx={sxChartContainer}>
                            <ChartCustomLine
                                dataChart={chartMavgPriceDataEvol}
                            />
                        </Box>
                    )}
            </Box>
        </Box>
    )
}
