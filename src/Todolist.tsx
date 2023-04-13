import { FC, memo, useCallback } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Task } from './Task';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist: FC<PropsType> = memo(({
    changeTaskTitle,
    changeTodolistTitle,
    removeTodolist,
    addTask,
    changeTaskStatus,
    removeTask,
    todolistId,
    ...props
}) => {

    const addTask2 = useCallback((title: string) => {
        addTask(title, todolistId);
    }, [addTask, todolistId])

    const removeTodolist2 = useCallback(() => {
        removeTodolist(todolistId);
    }, [removeTodolist, todolistId])

    const changeTodolistTitle2 = useCallback((title: string) => {
        changeTodolistTitle(todolistId, title);
    }, [changeTodolistTitle, todolistId])

    const onAllClickHandler = () => props.changeFilter("all", todolistId)
    const onActiveClickHandler = () => props.changeFilter("active", todolistId);
    const onCompletedClickHandler = () => props.changeFilter("completed", todolistId);

    let tasks = props.tasks;
    if (props.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    const removeTask2 = useCallback((taskId: string) => {
        removeTask(taskId, todolistId)
    }, [removeTask, todolistId])

    const changeTaskStatus2 = useCallback((id: string, isDone: boolean) => {
        changeTaskStatus(id, isDone, todolistId)
    }, [changeTaskStatus, todolistId])

    const changeTaskTitle2 = useCallback((taskId: string, newTitle: string) => {
        changeTaskTitle(taskId, newTitle, todolistId)
    }, [changeTaskTitle, todolistId])

    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle2} />
            <IconButton onClick={removeTodolist2}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask2} />
        <div>
            {
                tasks.map(t => {
                    return <Task
                        changeTaskStatus={changeTaskStatus2}
                        changeTaskTitle={changeTaskTitle2}
                        removeTask={removeTask2}
                        task={t}
                        key={t.id}
                    />
                })

            }
        </div>
        <div style={{ paddingTop: "10px" }}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
                color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
                color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}
                color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})

