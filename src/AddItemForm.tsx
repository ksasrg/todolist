
import { PostAdd } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import TextField from '@mui/material/TextField'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        error && setError('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const addTask = () => {
        if (title.trim() === '') {
            setError('Error')
            setTitle("");
            return
        }
        props.addItem(title.trim());
        setTitle("");
        setError('')
    }

    return (
        <div>
            <TextField value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                variant="outlined"
                error={!!error}
                helperText={error}
                size='small'
            />
            {/* <Button onClick={addTask} variant={'contained'} color={'primary'} >+</Button> */}
            <IconButton aria-label="delete" onClick={addTask}>
                <PostAdd fontSize='medium'/>
            </IconButton>
        </div>
    )
}