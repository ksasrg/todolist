import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { setAppStatus, setIsInitialized } from '../../app/app-slice'
import { LoginType, authAPI } from '../../api/todolists-api'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'

const initialState = {
    isLoggedIn: false
}

export const getMe = createAsyncThunk(
    'auth/me',
    async (_, { dispatch }) => {
        dispatch(setAppStatus('loading'))
        try {
            const res = await authAPI.getMe()
            dispatch(setAppStatus('succeeded'))
            return res.data
        } catch (error) {
            dispatch(setAppStatus('failed'))
            // throw Error((error as any).message)
        } finally {
            dispatch(setIsInitialized(true))
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { dispatch }) => {
        dispatch(setAppStatus('loading'))
        authAPI.logout()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedIn(false))
                    dispatch(setAppStatus('succeeded'))
                } else {
                    dispatch(setAppStatus('failed'))
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                dispatch(setAppStatus('failed'))
                handleServerNetworkError(error, dispatch)
            })
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (data: LoginType, { dispatch }) => {
        dispatch(setAppStatus('loading'))

        try {
            const res = await authAPI.login(data)

            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
                console.log(res.data.data.userId); // debug
            } else {
                handleServerAppError(res.data, dispatch)
            }

        } catch (error) {
            handleServerNetworkError((error as any).message, dispatch)

        } finally {
            dispatch(setAppStatus('idle'))
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMe.fulfilled, (state, action) => {
                if (action.payload?.resultCode === 0) {
                    state.isLoggedIn = true
                } else {
                    // handleServerAppError(res.data, dispatch)
                }
            })
    }
})

export const {
    setIsLoggedIn
} = authSlice.actions

export default authSlice.reducer