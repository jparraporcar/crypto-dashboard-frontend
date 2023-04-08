import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import layoutReducer from './slices/layoutSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        layout: layoutReducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
