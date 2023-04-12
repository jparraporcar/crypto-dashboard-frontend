import {
    CandleChartResult,
    TNamedCandles,
    TNamedCandlesT,
    TPriceVector,
    TVolumeVector,
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

export function getVectorsAverage(vArray: TPriceVector[] | TVolumeVector[]) {
    let vAcumRes = initializeArray(vArray[0].length, 0)
    const vLength = initializeArray(vArray[0].length, vArray.length)
    for (let i = 0; i < vArray.length; i++) {
        const vActual = vArray[i]
        vAcumRes = sumVectors(vAcumRes, vActual)
    }
    return divideVectors(vAcumRes, vLength)
}

// IMPORTANT: vector arrays are sorted by order of Object.keys(obj).sort() which represents ascending order of tokenlist names
export function namedCandlesDataWindowToNormVectorOfConstants(
    namedCandles: TNamedCandles[],
    namedCandlesNorm: TNamedCandles,
    prop: keyof CandleChartResult
) {
    const result: TPriceVector[] | TVolumeVector[] = []
    const norm = Object.keys(namedCandlesNorm)
        .sort()
        .map((key: string) => {
            return Number(namedCandlesNorm[key][prop])
        })
    for (let i = 0; i < namedCandles.length; i++) {
        const v = Object.keys(namedCandles[i])
            .sort()
            .map((key: string) => {
                return Number(namedCandles[i][key][prop])
            })
        result.push(divideVectors(v, norm))
    }
    return result
}

export const transformFromT = (input: TNamedCandlesT[]) => {
    const keys = Object.keys(input[0]).sort()
    const values = Object.keys(input[0])
        .sort()
        .map((key) => input[0][key])
    const numberOfCandles = values[0].length
    const output: TNamedCandles[] = []
    // values[0].length is the length of each array containing all the candles requested for the first token name
    // keys.length is the total amount of tokens
    for (let k = 0; k < numberOfCandles; k++) {
        const listOfSameInstantCandles = createListOfSameInstantCandles(
            values,
            k
        )
        output.push(fillObjWithInstanCandle(keys, listOfSameInstantCandles))
    }

    return output // this output is not properly sorted but it will be sorted afterwards
}

// Auxiliary functions for transformFromT

const fillObjWithInstanCandle = (
    tokenList: string[],
    listOfSameInstantCandles: CandleChartResult[]
) => {
    const obj = {} as TNamedCandles
    for (let t = 0; t < tokenList.length; t++) {
        obj[tokenList[t]] = listOfSameInstantCandles[t]
    }
    return obj
}

const createListOfSameInstantCandles = (
    nestedCandles: CandleChartResult[][],
    index: number
) => {
    const result = []
    for (let i = 0; i < nestedCandles.length; i++) {
        result.push(nestedCandles[i][index]) // list with a single candle for all the tokens in same order as the keys
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
