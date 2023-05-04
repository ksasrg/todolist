import { v1 } from 'uuid';
import { TodolistType, todolistsAPI } from '../api/todolists-api'
import { Dispatch } from 'redux';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | setTodolistsActionType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)

        case 'ADD-TODOLIST':
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl =>
                tl.id === action.id ? { ...tl, title: action.title } : tl)

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl =>
                tl.id === action.id ? { ...tl, filter: action.filter } : tl)
        }

        case 'SET-TODOLISTS':
            return action.todos.map(tl => ({ ...tl, filter: 'all' }))

        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId }
}
export const addTodolistAC = (title: string, todolistId: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title, todolistId }
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter }
}

export type setTodolistsActionType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todos: TodolistType[]) => {
    return { type: 'SET-TODOLISTS', todos } as const
}


export const getTodosTC = () =>
    (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
            })
    }

export const addTodolistTC = (title: string) =>
    (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(title, res.data.data.item.id))
            })
    }

export const removeTodolistTC = (todolistId: string) =>
    (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodolistAC(todolistId))
            })
    }

export const changeTodolistTitleTC = (todolistId: string, title: string) =>
    (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC(todolistId, title))
                }
            })
    }
