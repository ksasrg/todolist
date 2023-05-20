import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TodolistType, todolistsAPI } from '../../api/todolists-api'
import { setAppStatus } from '../../app/app-slice'
import { addEmptyTodolist, setEptyTodolists } from './tasks-slice'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: TodolistDomainType[] = []

export const fetchTodolists = createAsyncThunk(
    'todolists/fetchTodolists',
    async (_, { dispatch }) => {
        dispatch(setAppStatus('loading'))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolists(res.data))
                dispatch(setEptyTodolists(res.data))
                dispatch(setAppStatus('succeeded'))
            })
    }
)

export const addTodolistThunk = createAsyncThunk(
    'todolists/addTodolist',
    async (title: string, { dispatch }) => {
        dispatch(setAppStatus('loading'))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolist(res.data.data.item))
                dispatch(addEmptyTodolist(res.data.data.item.id))
                dispatch(setAppStatus('succeeded'))
            })
    }
)

export const removeTodolistThunk = createAsyncThunk(
    'todolists/removeTodolist',
    async (todolistId: string, { dispatch }) => {
        dispatch(setAppStatus('loading'))
        todolistsAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodolist(todolistId))
                dispatch(setAppStatus('succeeded'))
            })
    }
)

export const changeTodolistTitleThunk = createAsyncThunk(
    'todolists/changeTodolistTitle',
    async (data: { todolistId: string, title: string }, { dispatch }) => {
        const { todolistId, title } = data
        todolistsAPI.updateTodolist(todolistId, title)
            .then(() => {
                dispatch(changeTodolistTitle({ todolistId, title }))
            })
    }
)


export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        setTodolists: (state, action: PayloadAction<TodolistType[]>) => {
            action.payload.forEach(tl => {
                state.push({ ...tl, filter: 'all', entityStatus: 'idle' })
            })
        },
        addTodolist: (state, action: PayloadAction<TodolistType>) => {
            state.unshift({ ...action.payload, filter: 'all', entityStatus: 'idle' })
        },
        removeTodolist: (state, action: PayloadAction<string>) => {
            return state.filter(tl => tl.id !== action.payload)
        },
        changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) => {
            return state.map(tl =>
                tl.id === action.payload.todolistId
                    ? { ...tl, filter: action.payload.filter } : tl)
        },
        changeTodolistTitle: (state, action: PayloadAction<{ todolistId: string, title: string }>) => {
            return state.map(tl =>
                tl.id === action.payload.todolistId
                    ? { ...tl, title: action.payload.title } : tl)
        }

    },
})

export const {
    setTodolists,
    addTodolist,
    removeTodolist,
    changeTodolistFilter,
    changeTodolistTitle
} = todolistsSlice.actions

export default todolistsSlice.reducer


export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type FilterValuesType = 'all' | 'active' | 'completed';