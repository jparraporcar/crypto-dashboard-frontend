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
            }
        },
    },
})

export const { setSnackbarCustom, setChartView } = layoutSlice.actions

export default layoutSlice.reducer
