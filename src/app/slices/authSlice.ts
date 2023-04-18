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
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        setIsLoggedOut: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        setIsSignedUp: (state, action: PayloadAction<boolean>) => {
            state.isSignedUp = action.payload
        },
    },
})

export const { setIsLoggedIn, setIsLoggedOut, setIsSignedUp } =
    authSlice.actions

export default authSlice.reducer
