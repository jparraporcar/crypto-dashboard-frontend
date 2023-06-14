import {
    CandleChartResult,
    TNamedCandles,
    TNamedCandlesT,
    TMultiplePriceVector,
    TMultipleVolumeVector,
} from './types'

export function divideVectors(v1: number[], v2: number[]) {
    if (v1.length !== v2.length) {
        throw new Error('Vectors must have equal length')
    }

    const result = []
    for (let i = 0; i < v1.length; i++) {
        result.push(v1[i] / v2[i])
    }
    return result
}

export function sumVectors(v1: number[], v2: number[]) {
    if (v1.length !== v2.length) {
        throw new Error('Vectors must have equal length')
    }

    const result = []
    for (let i = 0; i < v1.length; i++) {
        result.push(v1[i] + v2[i])
    }
    return result
}

export function initializeArray(length: number, constant: number) {
    const ArrayZeros = new Array(length)
    for (let i = 0; i < ArrayZeros.length; i++) {
        ArrayZeros[i] = constant
    }
    return ArrayZeros
}

export function getVectorsAverage(
    vArray: TMultiplePriceVector[] | TMultipleVolumeVector[]
) {
    // initialize an array of length S (total number of symbols requested) with 0's
    let vAcumRes = initializeArray(vArray[0].length, 0)
    // initialize an array of length S (total number of symbols requested) but
    // filled with k's where all k's are the number of candles to calculate the average
    const vLength = initializeArray(vArray[0].length, vArray.length)
    for (let i = 0; i < vArray.length; i++) {
        const vActual = vArray[i]
        vAcumRes = sumVectors(vAcumRes, vActual)
    }
    return divideVectors(vAcumRes, vLength)
}

// IMPORTANT: vector arrays are sorted by order of Object.keys(obj).sort() which represents ascending order of tokenlist names
export function namedCandlesDataWindowToNormVectorOfConstants(
    namedCandlesDataWindow: TNamedCandles[],
    namedCandlesNorm: TNamedCandles,
    prop: keyof CandleChartResult
) {
    const result: TMultiplePriceVector[] | TMultipleVolumeVector[] = []
    // keys length corresponds with the length of the total amount of symbols chosen
    // but extracting only the value of the input property (either volume or price)
    const norm = Object.keys(namedCandlesNorm)
        .sort()
        .map((key: string) => {
            return Number(namedCandlesNorm[key][prop])
        })
    // the first index of namdeCandles (namedCandlesDataWindow[0]) is actually = to namedCandlesNorm and
    // the result of the vector division will give an array of length = to amount of symbols filled
    // with ones, which is the reference point for calculating the multiple of volume/price
    for (let i = 0; i < namedCandlesDataWindow.length; i++) {
        const v = Object.keys(namedCandlesDataWindow[i])
            .sort()
            .map((key: string) => {
                return Number(namedCandlesDataWindow[i][key][prop])
            })
        result.push(divideVectors(v, norm)) // result is ordered as sort()
        // result is a matrix where each row is an array of length S (total amount of symbols) with all the multiples of volume
        // at the initial reference time (an array of ones of length S)
        // each row represents a different candle and thus an evolution in the multiple
    }
    return result
}

export const getVectorOfOpenTime = (
    namedCandles: TNamedCandles[]
): string[] => {
    const firstKeyForConvenience = Object.keys(namedCandles[0])[0]
    const vOpenTime = namedCandles.map((el) => {
        const epochTime = el[firstKeyForConvenience].openTime
        const dateObj = new Date(epochTime)
        const hours = dateObj.getHours() // get the hours
        const minutes = dateObj.getMinutes() // get the minutes
        const formatedTime = `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}`
        return formatedTime
    })
    return vOpenTime
}
// method for convenience to make easier to work with the data from backend
export const transformFromT = (input: TNamedCandlesT[]) => {
    // keys length corresponds with the total amount of symbols chosen
    const keys = Object.keys(input[0]).sort()
    // values is an array of arrays, it can be seen as a matrix SxK where S is the number of Symbols (rows),
    // and K is the number of columns (candles)
    // each row is an array of length=windowLength of the same symbol
    const values = Object.keys(input[0])
        .sort()
        .map((key) => input[0][key])
    const numberOfCandles = values[0].length
    const output: TNamedCandles[] = []
    for (let k = 0; k < numberOfCandles; k++) {
        // each array with name listOfSameInstantCandles is of type CandleChartResult[] and
        // contains a list of S candles (S = number of symbols) with the same openTime
        const listOfSameInstantCandles = createListOfSameInstantCandles(
            values,
            k
        )
        output.push(fillObjWithInstanCandle(keys, listOfSameInstantCandles))
    }

    return output // result is ordered as sort()
}

// Auxiliary functions for transformFromT
const fillObjWithInstanCandle = (
    symbolList: string[],
    listOfSameInstantCandles: CandleChartResult[]
) => {
    const obj = {} as TNamedCandles
    for (let s = 0; s < symbolList.length; s++) {
        // creating an array where each index is of type TNamedCandles
        // (each index has information of all symbols but only one candle)
        obj[symbolList[s]] = listOfSameInstantCandles[s]
    }
    return obj
}

const createListOfSameInstantCandles = (
    nestedCandles: CandleChartResult[][],
    candleIndex: number
) => {
    const result = []
    for (let i = 0; i < nestedCandles.length; i++) {
        result.push(nestedCandles[i][candleIndex]) // list with a single candle for all the tokens in same order as the keys
    }
    return result
}

export const getObjCheckTickers = (data: string[]) => {
    const obj = {} as { [key: string]: boolean }
    data.forEach((tickerName) => {
        obj[tickerName] = false
    })
    return obj
}

export const getAccumRateOfChangeOfAllSymbols = (
    vArray: TMultiplePriceVector[] | TMultipleVolumeVector[],
    deltaT: number
): number[] => {
    const result: number[] = []
    for (let s = 0; s < vArray[0].length; s++) {
        // array with all the accumulated rate of change of all candles
        result.push(getAccumRateOfChangeOfSymbol(vArray, s, deltaT))
    }
    return result
}

export const getAccumRateOfChangeOfSymbol = (
    vArray: TMultiplePriceVector[] | TMultipleVolumeVector[],
    symbolIndex: number,
    deltaT: number
): number => {
    let vAccumRes = 0
    for (let k = 0; k < vArray.length - 1; k++) {
        vAccumRes =
            vAccumRes +
            (vArray[k + 1][symbolIndex] - vArray[k][symbolIndex]) / deltaT
    }
    return vAccumRes
}
