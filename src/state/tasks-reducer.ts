import { TasksStateType } from '../App';
import { v1 } from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(t => t.id !== action.taskId)
            }

        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [
                    { id: v1(), title: action.title, isDone: false },
                    ...state[action.todolistId]]
            }

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId
                        ? { ...t, isDone: action.isDone } : t)
            }

        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId
                        ? { ...t, title: action.title } : t)
            }

        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }

        case 'REMOVE-TODOLIST':
            const copyState = { ...state };
            delete copyState[action.id];
            return copyState;

        default:
            return state;
    }
}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({ type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId } as const)

export type AddTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) =>
    ({ type: 'ADD-TASK', title, todolistId } as const)

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) =>
    ({ type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId } as const)

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) =>
    ({ type: 'CHANGE-TASK-TITLE', title, todolistId, taskId } as const)