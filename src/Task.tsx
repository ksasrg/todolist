import { Checkbox, IconButton } from "@mui/material"
import { TaskType } from "./Todolist"
import { EditableSpan } from "./EditableSpan"
import { Delete } from "@mui/icons-material"
import { ChangeEvent, FC, memo, useCallback } from "react"

type PropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}

export const Task: FC<PropsType> = memo(({
    changeTaskTitle,
    task,
    ...props
}) => {
    console.log('task');


    const onClickHandler = () => props.removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(task.id, newIsDoneValue);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue);
    }, [changeTaskTitle, task.id])


    return <div key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>

})