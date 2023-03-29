import { v1 } from "uuid"
import { AllTaskType } from "../App"
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"

export const tasksReducer = (state: AllTaskType, action: ActionType): AllTaskType => {
    switch (action.type) {

        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.id)
            }

        case 'ADD-TASK':
            return {
                ...state,
                [action.todoListId]:
                    [
                        { id: v1(), title: action.title, isDone: false },
                        ...state[action.todoListId]
                    ]
            }

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t =>
                    t.id === action.taskId
                        ? { ...t, isDone: action.checked }
                        : t)
            }

        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t =>
                    t.id === action.taskId
                        ? { ...t, title: action.title }
                        : t)
            }

        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }

        case 'REMOVE-TODOLIST':
            const newState = { ...state }
            delete newState[action.todolistId]
            return newState

        default:
            throw new Error('I don\'t understand this type')
    }
}

export type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todoListId: string) => {
    return { type: 'REMOVE-TASK', id, todoListId } as const
}

export type AddTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todoListId: string) => {
    return { type: 'ADD-TASK', title, todoListId } as const
}

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, checked: boolean, todoListId: string) => {
    return { type: 'CHANGE-TASK-STATUS', taskId, checked, todoListId } as const
}

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string) => {
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todoListId } as const
}