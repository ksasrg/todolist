import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { todolistAPI } from '../api/todolist-api'

export default {
    title: 'API'
}

let todolists: any

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodolists()
            .then(resolve => {
                setState(resolve.data)
                todolists = [...resolve.data]
                console.log(todolists);
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.createTodolist('asdercvddf')
            .then(resolve => setState(resolve.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        let todolistId = ''

        if (todolists[0]) {
            todolistId = todolists[0].id
        }

        todolistAPI.deleteTodolist(todolistId)
            .then(resolve => setState(resolve.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        let todolistId = ''

        if (todolists[0]) {
            todolistId = todolists[0].id
        }

        todolistAPI.updateTodolist(todolistId, 'NEW NEW NEW NEW ')
            .then(resolve => setState(resolve.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
