import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserSettings } from '../../types'

export interface ISymbolsState {
    userPairsSelected: string[]
    searchTerm: string
    settings: UserSettings
}

const initialState: ISymbolsState = {
    userPairsSelected: [],
    searchTerm: '',
    settings: {
        interval: '1m',
        windowLength: 5,
        symbolsListSelected: JSON.parse(
            localStorage.getItem('symbolsListSelected') || '[]'
        ),
        pairsListSelected: JSON.parse(
            localStorage.getItem('pairsListSelected') || '[]'
        ),
    },
}

export const tickersSlice = createSlice({
    name: 'tickers',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload
        },
        setSettings: (state, action: PayloadAction<UserSettings>) => {
            state.settings = action.payload
        },
    },
})

export const { setSearchTerm, setSettings } = tickersSlice.actions

export default tickersSlice.reducer
