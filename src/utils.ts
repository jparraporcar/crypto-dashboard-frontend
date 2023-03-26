import { TPriceVector, TVolumeVector } from './types'

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
