import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { AddItemForm } from './AddItemForm';
import { AditableSpan } from './AditableSpan';
import { FilterValuesType, TaskType } from './App';



type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskId: string, checked: boolean, todoListId: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, title: string) => void
    changeListTitle: (todoListId: string, title: string) => void
    filter: FilterValuesType
    removeList: (todoListId: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const removeList = () => {
        props.removeList(props.id)
    }

    const changeListTitle = (title: string) => {
        props.changeListTitle(props.id, title)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return <div>
        <h3>

            <AditableSpan title={props.title} onChange={changeListTitle} />
            <button onClick={removeList}>X</button>
        </h3>

        <AddItemForm addItem={addTask} />
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const changeStatusHandler =
                        (e: ChangeEvent<HTMLInputElement>) =>
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)

                    const onChangeTitle = (title: string) => {
                        props.changeTaskTitle(props.id, t.id, title)
                    }

                    return <li
                        key={t.id}
                        className={t.isDone ? 'done' : undefined}
                    >
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={changeStatusHandler}
                        />
                        <AditableSpan
                            title={t.title}
                            onChange={onChangeTitle}
                        />
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




