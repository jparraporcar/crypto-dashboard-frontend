import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ILayoutState {
    snackbar: {
        message: string
        isOpen: boolean
        severity: 'success' | 'error' | 'warning' | 'info' | undefined
        autoHideDuration: number | undefined
    }
    chartView: {
        multipleOfVolume: boolean
        multipleOfPrice: boolean
        multipleOfVolumeAvg: boolean
        multipleOfPriceAvg: boolean
        multipleOfVolumeAvgEvol: boolean
        multipleOfPriceAvgEvol: boolean
    }
    evolSymbol: {
        chartTitle: string
        chartSymbol: string
        chartIndex: number | undefined
    }
}

const initialState: ILayoutState = {
    snackbar: {
        message: '',
        isOpen: false,
        severity: undefined,
        autoHideDuration: undefined,
    },
    chartView: {
        multipleOfVolume: false,
        multipleOfPrice: false,
        multipleOfVolumeAvg: true,
        multipleOfPriceAvg: true,
        multipleOfVolumeAvgEvol: false,
        multipleOfPriceAvgEvol: false,
    },
    evolSymbol: {
        chartTitle: '',
        chartSymbol: '',
        chartIndex: undefined,
    },
}

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setSnackbarCustom: (
            state,
            action: PayloadAction<ILayoutState['snackbar']>
        ) => {
            state.snackbar = {
                message: action.payload.message,
                isOpen: action.payload.isOpen,
                severity: action.payload.severity,
                autoHideDuration: action.payload.autoHideDuration,
            }
        },
        setChartView: (
            state,
            action: PayloadAction<ILayoutState['chartView']>
        ) => {
            state.chartView = {
                multipleOfVolume: action.payload.multipleOfVolume,
                multipleOfPrice: action.payload.multipleOfPrice,
                multipleOfVolumeAvg: action.payload.multipleOfVolumeAvg,
                multipleOfPriceAvg: action.payload.multipleOfPriceAvg,
                multipleOfVolumeAvgEvol: action.payload.multipleOfVolumeAvgEvol,
                multipleOfPriceAvgEvol: action.payload.multipleOfPriceAvgEvol,
            }
        },
        setEvolSymbol: (
            state,
            action: PayloadAction<ILayoutState['evolSymbol']>
        ) => {
            state.evolSymbol = action.payload
        },
    },
})

export const { setSnackbarCustom, setChartView, setEvolSymbol } =
    layoutSlice.actions

export default layoutSlice.reducer
