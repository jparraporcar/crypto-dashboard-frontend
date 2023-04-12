import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getObjCheckTickers } from '../../utils'

type ObjCheck = { [key: string]: boolean } | null

export interface ITickersState {
    allTickers: string[] | undefined
    allTickersObjCheck: ObjCheck | undefined
    customerTickers: string[] | undefined
    customerTickersObjCheck: ObjCheck | undefined
    searchTerm: string
}

const initialState: ITickersState = {
    allTickers: undefined,
    allTickersObjCheck: undefined,
    customerTickers: undefined,
    customerTickersObjCheck: undefined,
    searchTerm: '',
}

export const tickersSlice = createSlice({
    name: 'tickers',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setAllTickers: (state, action: PayloadAction<string[]>) => {
            state.allTickers = action.payload
        },
        setAllTickersObjCheck: (state, action: PayloadAction<ObjCheck>) => {
            state.allTickersObjCheck = action.payload
        },
        setCustomerTickers: (state, action: PayloadAction<string[]>) => {
            state.customerTickers = action.payload
        },
        setCustomerTickersObjCheck: (
            state,
            action: PayloadAction<ObjCheck>
        ) => {
            state.customerTickersObjCheck = action.payload
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload
        },
    },
})

export const {
    setAllTickers,
    setAllTickersObjCheck,
    setCustomerTickers,
    setCustomerTickersObjCheck,
    setSearchTerm,
} = tickersSlice.actions

export default tickersSlice.reducer
