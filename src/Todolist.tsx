import React, { ChangeEvent, RefObject, useRef, useState } from 'react';
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
}



export const Todolist: React.FC<PropsType> = ({
  title: title,
  tasks: tasks,
  removeTask: removeTask,
  changeFilter: changeFilter,
  addTask: addTask,
}) => {
  // const addTaskInput: RefObject<HTMLInputElement> = useRef(null)

  const [inputValue, setInputValue] = useState<string>('')

  const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value.trimStart())
  }

  // const addTask = () => {    
  //   if (addTaskInput.current) {
  //     if (addTaskInput.current.value.trim() === '') return;
  //     props.addTask(addTaskInput.current.value.trim())
  //     addTaskInput.current.value = ''
  //   }

  // }

  const onClickHandler = () => {
    if (inputValue.trim() === '') return;
    addTask(inputValue)
    setInputValue('')
  }




  return <div>
    <h3>{title}</h3>
    <div>
      {/* <input ref={addTaskInput} value={inputValue}  onChange={onInputChangeHandler} /> */}
      {/* <input ref={addTaskInput} /> */}
      <input
        onChange={onInputChangeHandler}
        value={inputValue}
      />
      <button disabled={inputValue.trim().length === 0} onClick={onClickHandler} >+</button>
      {inputValue.length > 15 && <div>больше 15</div>}

    </div>
    <ul>
      {
        tasks.map(t => <li key={t.id}>
          <button onClick={() => { removeTask(t.id) }}>x</button>
          <input type="checkbox" defaultChecked={t.isDone} />
          <span>{t.title}</span>
        </li>)
      }
    </ul>
    <div>
      <button onClick={() => { changeFilter("all") }}>
        All
      </button>
      <button onClick={() => { changeFilter("active") }}>
        Active
      </button>
      <button onClick={() => { changeFilter("completed") }}>
        Completed
      </button>
    </div>
  </div>
}
