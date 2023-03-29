import { v1 } from "uuid"
import { FilterValuesType, TodoListType } from "../App"

export const todolistsReducer = (state: TodoListType[], action: ActionType): TodoListType[] => {
    switch (action.type) {

        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)

        case 'ADD-TODOLIST':
            return [
                ...state,
                { id: action.todolistId, title: action.title, filter: 'all' }
            ]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? { ...tl, title: action.title } : tl)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? { ...tl, filter: action.filter } : tl)


        default:
            throw new Error('I don\'t understand this type')
    }
}

export type ActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return { type: 'REMOVE-TODOLIST', todolistId } as const
}

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return { type: 'ADD-TODOLIST', title, todolistId: v1() } as const
}

export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title } as const
}

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilteAC>
export const changeTodolistFilteAC = (todolistId: string, filter: FilterValuesType) => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter } as const
}