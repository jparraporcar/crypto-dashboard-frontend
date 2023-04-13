export interface CandleChartResult {
    openTime: number
    open: string
    high: string
    low: string
    close: string
    volume: string
    closeTime: number
    quoteVolume: string
    trades: number
    baseAssetVolume: string
    quoteAssetVolume: string
}

export interface CandlesOptions {
    symbol: string
    interval: CandleChartInterval_LT
    limit?: number
    startTime?: number
    endTime?: number
}

export type TObject = { [key: string]: string }

export type TNamedCandles = { [key: string]: CandleChartResult }

export type TNamedCandlesT = { [key: string]: CandleChartResult[] }

export type CandleChartInterval_LT =
    | '1m'
    | '3m'
    | '5m'
    | '15m'
    | '30m'
    | '1h'
    | '2h'
    | '4h'
    | '6h'
    | '8h'
    | '12h'
    | '1d'
    | '3d'
    | '1w'
    | '1M'

export type TVolumeVector = number[]

export type TPriceVector = number[]

export type TStableCoin = 'USDT' | 'BUSD'

export type ObjCheck = { [key: string]: boolean } | null

export type UserSettings = {
    interval: CandleChartInterval_LT
    stableCoin: TStableCoin
    windowLength: number
    tokensList: string[] | undefined
}
