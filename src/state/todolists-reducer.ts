import { v1 } from "uuid"
import { FilterValuesType, TodoListType } from "../App"

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type ActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (state: TodoListType[], action: ActionType): TodoListType[] => {
    switch (action.type) {

        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)

        case 'ADD-TODOLIST':
            return [
                ...state,
                { id: v1(), title: action.title, filter: 'all' }
            ]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? { ...tl, title: action.title } : tl)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? { ...tl, filter: action.filter } : tl)


        default:
            throw new Error('I don\'t understand this type')
    }
}


export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId }
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title }
}

export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title }
}

export const ChangeTodolistFilteAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter }
}