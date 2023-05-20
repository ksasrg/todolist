import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TaskPriorities, TaskStatuses, TaskType, TodolistType, todolistsAPI } from '../../api/todolists-api'
import { setAppStatus } from '../../app/app-slice'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { RootState } from '../../app/store_rtk'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: TasksStateType = {}

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (todolistId: string, { dispatch }) => {
        dispatch(setAppStatus('loading'))
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasks({ tasks, todolistId }))
                dispatch(setAppStatus('succeeded'))
            })
    }
)

export const removeTaskThunk = createAsyncThunk(
    'tasks/removeTask',
    async ({ todolistId, taskId }: { todolistId: string, taskId: string }, { dispatch }) => {
        const res = await todolistsAPI.deleteTask(todolistId, taskId)

        if (res.data.resultCode === 0) {
            dispatch(removeTask({ todolistId, taskId }))
        } else {
            // handleServerAppError(res.data, dispatch)
        }
    }
)

type AddTaskType = {
    todolistId: string,
    title: string
}
export const addTaskThunk = createAsyncThunk(
    'tasks/addTask',
    async (data: AddTaskType, { dispatch }) => {
        const { todolistId, title } = data
        dispatch(setAppStatus('loading'))
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item
                    const action = addTask(task)
                    dispatch(action)
                    dispatch(setAppStatus('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
)

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
type UpdateTaskType = {
    taskId: string,
    domainModel: UpdateDomainTaskModelType,
    todolistId: string
}
export const updateTaskThunk = createAsyncThunk(
    'tasks/updateTask',
    async (data: UpdateTaskType, { dispatch, getState }) => {
        const { todolistId, taskId, domainModel } = data
        const { tasks: state } = getState() as RootState
        const task = state[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.log('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = updateTask({ taskId, domainModel, todolistId })
                    dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            })
    }
)

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setEptyTodolists: (state, action: PayloadAction<TodolistType[]>) => {
            action.payload.forEach(tl => {
                state[tl.id] = []
                console.log(tl.id);
            })
        },
        setTasks: (state, action: PayloadAction<{ tasks: TaskType[], todolistId: string }>) => {
            state[action.payload.todolistId] = action.payload.tasks
        },
        removeTask: (state, action: PayloadAction<{ todolistId: string, taskId: string }>) => {
            state[action.payload.todolistId] =
                state[action.payload.todolistId].filter(task =>
                    task.id !== action.payload.taskId)
        },
        addTask: (state, action: PayloadAction<TaskType>) => {
            state[action.payload.todoListId] = [
                action.payload,
                ...state[action.payload.todoListId]
            ]
        },
        updateTask: (state, action: PayloadAction<UpdateTaskType>) => {
            state[action.payload.todolistId] =
                state[action.payload.todolistId].map(task =>
                    task.id === action.payload.taskId
                        ? { ...task, ...action.payload.domainModel }
                        : task)
        },
        addEmptyTodolist: (state, action: PayloadAction<string>) => {
            state[action.payload] = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(removeTaskThunk.fulfilled, (state, action) => {
                // appSlice.caller(setAppStatus('loading')) 
            })
    }
})

export const {
    setEptyTodolists,
    setTasks,
    removeTask,
    addTask,
    updateTask,
    addEmptyTodolist
} = tasksSlice.actions

export default tasksSlice.reducer

export type TasksStateType = {
    [key: string]: Array<TaskType>
}