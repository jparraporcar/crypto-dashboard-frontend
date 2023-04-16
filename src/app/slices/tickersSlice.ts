import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ObjCheck, UserSettings } from '../../types'

export interface ISymbolsState {
    userPairsShare: string[]
    searchTerm: string
    settings: UserSettings
}

const initialState: ISymbolsState = {
    userPairsShare: [],
    searchTerm: '',
    settings: {
        interval: '1m',
        windowLength: 5,
        symbolsList: undefined,
    },
}

export const tickersSlice = createSlice({
    name: 'tickers',
    initialState,
    reducers: {
        setUserPairsShare: (state, action: PayloadAction<string[]>) => {
            state.userPairsShare = action.payload
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload
        },
        setSettings: (state, action: PayloadAction<UserSettings>) => {
            state.settings = action.payload
        },
    },
})

export const { setUserPairsShare, setSearchTerm, setSettings } =
    tickersSlice.actions

export default tickersSlice.reducer
