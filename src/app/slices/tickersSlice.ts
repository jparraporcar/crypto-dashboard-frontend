import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ObjCheck, UserSettings } from '../../types'

export interface ITickersState {
    allTickers: string[] | undefined
    allTickersCheck: ObjCheck | undefined
    userTickers: string[] | undefined
    userTickersCheck: ObjCheck | undefined
    searchTerm: string
    settings: UserSettings
}

const initialState: ITickersState = {
    allTickers: undefined,
    allTickersCheck: undefined,
    userTickers: undefined,
    userTickersCheck: undefined,
    searchTerm: '',
    settings: {
        interval: '15m',
        stableCoin: 'USDT',
        windowLength: 15,
        tokensList: undefined,
    },
}

export const tickersSlice = createSlice({
    name: 'tickers',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setAllTickers: (state, action: PayloadAction<string[]>) => {
            state.allTickers = action.payload
        },
        setAllTickersCheck: (state, action: PayloadAction<ObjCheck>) => {
            state.allTickersCheck = action.payload
        },
        setUserTickers: (state, action: PayloadAction<string[]>) => {
            state.userTickers = action.payload
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload
        },
        setSettings: (state, action: PayloadAction<UserSettings>) => {
            state.settings = action.payload
        },
    },
})

export const {
    setAllTickers,
    setAllTickersCheck,
    setUserTickers,
    setSearchTerm,
    setSettings,
} = tickersSlice.actions

export default tickersSlice.reducer
