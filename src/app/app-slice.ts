import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch } from './store_rtk'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface initialStateType {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

const initialState: initialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError: (state, action: PayloadAction<string | null >) => {
            state.error = action.payload
        },
        setIsInitialized: (state, action: PayloadAction<boolean>) => {
            state.isInitialized = action.payload
        },
        setAppStatus: (state, action: PayloadAction<RequestStatusType>) => {
            state.status = action.payload
        }
    },
})

export const {
    setAppError,
    setAppStatus,
    setIsInitialized
} = appSlice.actions

export default appSlice.reducer