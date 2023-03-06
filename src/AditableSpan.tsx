import { ChangeEvent, useState } from "react"


type aditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}

export function AditableSpan(props: aditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const viewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        editMode
            ? <input value={title} onChange={onchangeHandler} onBlur={viewMode} autoFocus />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}

// 39:35