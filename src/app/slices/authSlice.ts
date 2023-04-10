import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IAuthState {
    isSignedUp: boolean
    isLoggedIn: boolean
}

const initialState: IAuthState = {
    isSignedUp: false,
    isLoggedIn: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        login: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        logout: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        signup: (state, action: PayloadAction<boolean>) => {
            state.isSignedUp = action.payload
        },
    },
})

export const { login, logout, signup } = authSlice.actions

export default authSlice.reducer
