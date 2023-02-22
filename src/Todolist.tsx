import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, checked: boolean) => void
    filter: FilterValuesType
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
        props.addTask(title.trim());
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

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return <div>
        <h3>{props.title}</h3>
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

                    const onClickHandler = () => props.removeTask(t.id)
                    const changeStatusHandler =
                        (e: ChangeEvent<HTMLInputElement>) =>
                            props.changeStatus(t.id, e.currentTarget.checked)

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
