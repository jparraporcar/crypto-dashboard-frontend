import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ILayoutState {
    snackbar: {
        message: string
        isOpen: boolean
        severity: 'success' | 'error' | 'warning' | 'info' | undefined
        autoHideDuration: number | undefined
    }
}

const initialState: ILayoutState = {
    snackbar: {
        message: '',
        isOpen: false,
        severity: undefined,
        autoHideDuration: undefined,
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
    },
})

export const { setSnackbarCustom } = layoutSlice.actions

export default layoutSlice.reducer
