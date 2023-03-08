import { Button, IconButton } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { AddItemForm } from './AddItemForm';
import { AditableSpan } from './AditableSpan';
import { FilterValuesType, TaskType } from './App';
import { Delete } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';



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
            {/* <button onClick={removeList}>X</button> */}
            <IconButton aria-label="delete" onClick={removeList}>
                <Delete />
            </IconButton>
            {/* <Button size="small" variant="outlined" onClick={removeList} >X</Button> */}
        </h3>

        <AddItemForm addItem={addTask} />
        <ul style={{ listStyleType: 'none' }}>
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
                        <Checkbox
                            // type="checkbox"
                            checked={t.isDone}
                            onChange={changeStatusHandler}
                        />
                        <AditableSpan
                            title={t.title}
                            onChange={onChangeTitle}
                        />
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button
                onClick={onAllClickHandler}
                color={'primary'}
                variant={props.filter === 'all' ? 'contained' : 'text'}
            >All</Button>
            <Button
                onClick={onActiveClickHandler}
                color={'primary'}
                variant={props.filter === 'active' ? 'contained' : 'text'}
            >Active</Button>
            <Button
                onClick={onCompletedClickHandler}
                color={'primary'}
                variant={props.filter === 'completed' ? 'contained' : 'text'}
            >Completed</Button>
        </div>
    </div>
}




