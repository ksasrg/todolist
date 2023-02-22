import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskId: string, checked: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeList: (todoListId: string) => void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string>('')

    const addTask = () => {
        if (title.trim() === '') {
            setError('Error')
            setTitle("");
            return
        }
        props.addTask(title.trim(), props.id);
        setTitle("");
        setError('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        error && setError('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const removeList = () => {
        props.removeList(props.id)
    }

    return <div>
        <h3>
            {props.title}
            <button onClick={removeList}>X</button>
        </h3>

        <div>
            <input value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const changeStatusHandler =
                        (e: ChangeEvent<HTMLInputElement>) =>
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)

                    return <li
                        key={t.id}
                        className={t.isDone ? 'done' : undefined}
                    >
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={changeStatusHandler}
                        />
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button
                onClick={onAllClickHandler}
                className={props.filter === 'all' ? ' active' : ''}
            >All</button>
            <button
                onClick={onActiveClickHandler}
                className={props.filter === 'active' ? 'active' : ''}
            >Active</button>
            <button
                onClick={onCompletedClickHandler}
                className={props.filter === 'completed' ? 'active' : ''}
            >Completed</button>
        </div>
    </div>
}
