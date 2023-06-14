import { Box, Fab, SxProps, Typography, useMediaQuery } from '@mui/material'
import { ChartData } from 'chart.js'
import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { TNamedCandles, TNamedCandlesT } from '../../types'
import {
    divideVectors,
    getAccumRateOfChangeOfAllSymbols,
    getVectorOfOpenTime,
    getVectorsAverage,
    namedCandlesDataWindowToNormVectorOfConstants,
    transformFromT,
} from '../../utils'
import { NavBar } from '../common/NavBar/NavBar'
import { Hourglass } from '../common/Hourglass/Hourglass'
import { MenuPVData } from '../common/MenuPVData/MenuPVData'
import { ChartCustomLineMain } from '../common/ChartCustom/ChartCustomLineMain'
import { ChartCustomLine } from '../common/ChartCustom/ChartCustomLine'
import { useLocation, useNavigate } from 'react-router-dom'
import { setIsLoading } from '../../app/slices/layoutSlice'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { ChartCustomScrollHelper } from '../common/ChartCustomScrollHelper/ChartCustomScrollHelper'
import { priceVolumeDataApi, priceVolumeDataWindowApi } from '../../env'

export const MultiplePVDataPage: React.FC = (): JSX.Element => {
    const [candlesData, setcandlesData] = useState<TNamedCandles[]>([])
    const timerRef = useRef<NodeJS.Timer>()
    const [fetchCounter, setFetchCounter] = useState<number>(0)
    const [normCandle, setNormCandle] = useState<TNamedCandles[]>([])
    const [chartVolumeData, setChartVolumeData] =
        useState<ChartData<'line', number[], string>>()
    const [chartPriceData, setChartPriceData] =
        useState<ChartData<'line', number[], string>>()
    useState<ChartData<'line', number[], string>>()
    const [chartMavgVolumeData, setChartMavgVolumeData] =
        useState<ChartData<'line', number[], string>>()
    const [chartMavgPriceData, setChartMavgPriceData] =
        useState<ChartData<'line', number[], string>>()
    const [chartMavgVolumeDataEvol, setChartMavgVolumeDataEvol] =
        useState<ChartData<'line', number[], string>>()
    const [chartMavgPriceDataEvol, setChartMavgPriceDataEvol] =
        useState<ChartData<'line', number[], string>>()
    const [multipleVolumeAccRoc, setMultipleVolumeAccRoc] = useState<number[]>(
        []
    )
    const [multiplePriceAccRoc, setMultiplePriceAccRoc] = useState<number[]>([])
    const [chartAccRocVolumeData, setChartAccRocVolumeData] =
        useState<ChartData<'line', number[], string>>()
    const [chartAccRocPriceData, setChartAccRocPriceData] =
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
    const isSmallScreen = useMediaQuery('(max-width: 1500px)')
    const isMobileLandscape = useMediaQuery('(max-height: 500px)')

    useEffect(() => {
        // handling the transition between /multiplePVData -> /settings and avoiding setting the state to true in each data refetch
        // at each scheduled interval since it is smoother not to see the loader in that scenario
        if (location.state === '/multiplePVData') {
            const newLocation = { ...location, state: {} }
            window.history.replaceState(
                null,
                '',
                newLocation.pathname + newLocation.search
            )
            dispatch(setIsLoading(true))
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            // DEVELOPMENT REMOTE
            const dataInst = await fetch(
                `${priceVolumeDataApi}?interval=${
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
                `${priceVolumeDataWindowApi}?interval=${
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
            }
        }

        try {
            // execute fetchData functions without delay first time
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
            setMultiplePriceAccRoc(
                getAccumRateOfChangeOfAllSymbols(
                    vArrayWindowMultiplesAvgPrice,
                    Number(settingsState.interval.replace('m', ''))
                )
            )
            setMultipleVolumeAccRoc(
                getAccumRateOfChangeOfAllSymbols(
                    vArrayWindowMultiplesAvgVolume,
                    Number(settingsState.interval.replace('m', ''))
                )
            )
        }
    }, [namedCandlesDataWindow, normCandle, settingsState.interval])

    useEffect(() => {
        if (
            multipleVolumeAccRoc.length > 0 &&
            multiplePriceAccRoc.length > 0 &&
            candlesData.length > 0
        ) {
            setChartAccRocVolumeData({
                labels: Object.keys(candlesData[0]).sort(),
                datasets: [
                    {
                        label: 'Accum roc of volume multiple',
                        data: multipleVolumeAccRoc,
                        backgroundColor: '#f7d759',
                    },
                ],
            })
            setChartAccRocPriceData({
                labels: Object.keys(candlesData[0]).sort(),
                datasets: [
                    {
                        label: 'Accum roc of returns',
                        data: multiplePriceAccRoc,
                        backgroundColor: '#f7d759',
                    },
                ],
            })
        }
    }, [multipleVolumeAccRoc, multiplePriceAccRoc, candlesData])

    useEffect(() => {
        if (
            namedCandlesDataWindow.length > 0 &&
            evolSymbolState.chartIndex !== undefined
        ) {
            const vOpenTime = getVectorOfOpenTime(namedCandlesDataWindow)
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

    const sxInner: SxProps = {
        position: 'relative',
        margin: 'auto',
        height: isMobileLandscape ? 'calc(100vh - 20px)' : 'calc(50vh - 20px)',
        width: isSmallScreen ? '2500px' : '95vw',
    }

    const sxOuterMobileScrollable: SxProps = {
        position: 'absolute',
        overflowX: 'scroll',
        width: '85vw',
        top: '0px',
    }

    return (
        <Box
            id="multiplePVData-outer1"
            component="div"
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <NavBar
                mainTitle={`V&P stats: ${settingsState.interval} / ${settingsState.windowLength}`}
                menuContent={<MenuPVData />}
                position="fixed"
                zIndex={2000}
                top={0}
            />
            {isSmallScreen && (
                <Fab
                    sx={{
                        position: 'fixed',
                        top: '40px',
                        left: '0px',
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
            )}
            <Box
                id="multiplePVData-outer2"
                component="div"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '100vw',
                    margin: '30px 30px 40px 30px',
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
                    !chartViewState.multipleOfVolumeAvg &&
                    !chartViewState.multipleOfVolumeRocAccum &&
                    !chartViewState.multipleOfPriceRocAccum && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 'calc(50vh - 57px)',
                            }}
                        >
                            <Typography variant="h3">
                                Please choose a chart to show
                            </Typography>
                        </Box>
                    )}
                {chartViewState.multipleOfVolume && chartVolumeData && (
                    <Box sx={{ position: 'relative' }}>
                        {isSmallScreen && (
                            <ChartCustomScrollHelper
                                sxInner={sxInner}
                                dataChart={chartVolumeData}
                            />
                        )}
                        <Box
                            className="outerMobileScrollable"
                            sx={isSmallScreen ? sxOuterMobileScrollable : {}}
                        >
                            <Box component="div" sx={sxInner}>
                                <ChartCustomLineMain
                                    dataChart={chartVolumeData}
                                />
                            </Box>
                        </Box>
                    </Box>
                )}

                {chartViewState.multipleOfPrice && chartPriceData && (
                    <Box sx={{ position: 'relative' }}>
                        {isSmallScreen && (
                            <ChartCustomScrollHelper
                                sxInner={sxInner}
                                dataChart={chartPriceData}
                            />
                        )}
                        <Box
                            className="outerMobileScrollable"
                            sx={isSmallScreen ? sxOuterMobileScrollable : {}}
                        >
                            <Box component="div" sx={sxInner}>
                                <ChartCustomLineMain
                                    dataChart={chartPriceData}
                                />
                            </Box>
                        </Box>
                    </Box>
                )}
                {chartViewState.multipleOfVolumeAvg && chartMavgVolumeData && (
                    <Box sx={{ position: 'relative' }}>
                        {isSmallScreen && (
                            <ChartCustomScrollHelper
                                sxInner={sxInner}
                                dataChart={chartMavgVolumeData}
                            />
                        )}
                        <Box sx={isSmallScreen ? sxOuterMobileScrollable : {}}>
                            <Box component="div" sx={sxInner}>
                                <ChartCustomLineMain
                                    dataChart={chartMavgVolumeData}
                                />
                            </Box>
                        </Box>
                    </Box>
                )}
                {chartViewState.multipleOfPriceAvg && chartMavgPriceData && (
                    <Box sx={{ position: 'relative' }}>
                        {isSmallScreen && (
                            <ChartCustomScrollHelper
                                sxInner={sxInner}
                                dataChart={chartMavgPriceData}
                            />
                        )}
                        <Box sx={isSmallScreen ? sxOuterMobileScrollable : {}}>
                            <Box component="div" sx={sxInner}>
                                <ChartCustomLineMain
                                    dataChart={chartMavgPriceData}
                                />
                            </Box>
                        </Box>
                    </Box>
                )}
                {chartViewState.multipleOfVolumeRocAccum &&
                    chartAccRocVolumeData && (
                        <Box sx={{ position: 'relative' }}>
                            {isSmallScreen && (
                                <ChartCustomScrollHelper
                                    sxInner={sxInner}
                                    dataChart={chartAccRocVolumeData}
                                />
                            )}
                            <Box
                                sx={
                                    isSmallScreen ? sxOuterMobileScrollable : {}
                                }
                            >
                                <Box component="div" sx={sxInner}>
                                    <ChartCustomLineMain
                                        dataChart={chartAccRocVolumeData}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    )}
                {chartViewState.multipleOfPriceRocAccum &&
                    chartAccRocPriceData && (
                        <Box sx={{ position: 'relative' }}>
                            {isSmallScreen && (
                                <ChartCustomScrollHelper
                                    sxInner={sxInner}
                                    dataChart={chartAccRocPriceData}
                                />
                            )}
                            <Box
                                sx={
                                    isSmallScreen ? sxOuterMobileScrollable : {}
                                }
                            >
                                <Box component="div" sx={sxInner}>
                                    <ChartCustomLineMain
                                        dataChart={chartAccRocPriceData}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    )}
                {evolSymbolState.chartSymbol !== '' &&
                    (evolSymbolState.chartTitle === 'Multiple of volume' ||
                        evolSymbolState.chartTitle ===
                            'Multiple of volume average' ||
                        evolSymbolState.chartTitle ===
                            'Accum roc of volume multiple') &&
                    chartMavgVolumeDataEvol && (
                        <Box sx={{ position: 'relative' }}>
                            {isSmallScreen && (
                                <ChartCustomScrollHelper
                                    sxInner={sxInner}
                                    dataChart={chartMavgVolumeDataEvol}
                                />
                            )}
                            <Box
                                sx={
                                    isSmallScreen ? sxOuterMobileScrollable : {}
                                }
                            >
                                <Box component="div" sx={sxInner}>
                                    <ChartCustomLine
                                        dataChart={chartMavgVolumeDataEvol}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    )}
                {evolSymbolState.chartSymbol !== '' &&
                    (evolSymbolState.chartTitle === 'Returns' ||
                        evolSymbolState.chartTitle === 'Average returns' ||
                        evolSymbolState.chartTitle ===
                            'Accum roc of returns') &&
                    chartMavgPriceDataEvol && (
                        <Box sx={{ position: 'relative' }}>
                            {isSmallScreen && (
                                <ChartCustomScrollHelper
                                    sxInner={sxInner}
                                    dataChart={chartMavgPriceDataEvol}
                                />
                            )}
                            <Box
                                sx={
                                    isSmallScreen ? sxOuterMobileScrollable : {}
                                }
                            >
                                <Box component="div" sx={sxInner}>
                                    <ChartCustomLine
                                        dataChart={chartMavgPriceDataEvol}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    )}
            </Box>
        </Box>
    )
}
