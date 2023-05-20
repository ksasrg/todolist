import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import appSlice from './app-slice'
import authSlice from '../features/Login/auth-slice'
import todolistsSlice from '../features/TodolistsList/todolists-slice'
import tasksSlice from '../features/TodolistsList/tasks-slice'


const store = configureStore({
    reducer: {
        app: appSlice,
        auth: authSlice,
        todolists: todolistsSlice,
        tasks: tasksSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store