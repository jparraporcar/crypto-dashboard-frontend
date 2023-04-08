import { createSlice } from '@reduxjs/toolkit'

export interface IAuthState {
    isRegistered: boolean
    isLoggedIn: boolean
}

const initialState: IAuthState = {
    isRegistered: false,
    isLoggedIn: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        login: (state) => {
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.isLoggedIn = false
        },
        register: (state) => {
            state.isRegistered = true
        },
    },
})

export const { login, logout, register } = authSlice.actions

export default authSlice.reducer
