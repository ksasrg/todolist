import React, { useCallback, useEffect } from 'react'
import { TaskStatuses } from '../../api/todolists-api'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { AddItemForm } from '../../components/AddItemForm/AddItemForm'
import { Todolist } from './Todolist/Todolist'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/store_rtk';
import { FilterValuesType, TodolistDomainType, addTodolistThunk, changeTodolistFilter, changeTodolistTitleThunk, fetchTodolists, removeTodolistThunk } from './todolists-slice';
import { addTaskThunk, removeTaskThunk, TasksStateType, updateTaskThunk } from './tasks-slice';

export const TodolistsList: React.FC = () => {
    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const state = useAppSelector(state => state)
    console.log(state);


    useEffect(() => {

        if (!isLoggedIn) return

        const thunk = fetchTodolists()
        dispatch(thunk)
    }, [])

    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        const thunk = removeTaskThunk({ todolistId, taskId })
        dispatch(thunk)
    }, [])

    const addTask = useCallback(function (title: string, todolistId: string) {
        const thunk = addTaskThunk({ title, todolistId })
        dispatch(thunk)
    }, [])

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
        const domainModel = { status }
        const thunk = updateTaskThunk({ taskId, domainModel, todolistId })
        dispatch(thunk)
    }, [])

    const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
        const domainModel = { title }
        const thunk = updateTaskThunk({ taskId, domainModel, todolistId })
        dispatch(thunk)
    }, [])

    const changeFilter = useCallback(function (filter: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilter({ todolistId, filter })
        dispatch(action)
    }, [])

    const removeTodolist = useCallback(function (id: string) {
        const thunk = removeTodolistThunk(id)
        dispatch(thunk)
    }, [])

    const changeTodolistTitle = useCallback(function (todolistId: string, title: string) {
        const thunk = changeTodolistTitleThunk({todolistId, title})
        dispatch(thunk)
    }, [])

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistThunk(title)
        dispatch(thunk)
    }, [dispatch])

    if (!isLoggedIn) return <Navigate to={'/login'} />

    return <>
        <Grid container style={{ padding: '20px' }}>
            <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{ padding: '10px' }}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
