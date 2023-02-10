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
}

export function Todolist(props: PropsType) {

  const [newInput, setnewInput] = useState('');
  console.log(newInput);

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setnewInput(e.currentTarget.value);
  }

  const onClickButtonHandler = () => {
    props.addTask(newInput)
    setnewInput('')
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'NumpadEnter' || e.code === 'Enter') {
      props.addTask(newInput)
      setnewInput('')
    }
  }

  const onAllCLickHandler = () => props.changeFilter("all");
  const onActiveCLickHandler = () => props.changeFilter("active");
  const onCompletedCLickHandler = () => props.changeFilter("completed");


  return <div>
    <h3>{props.title}</h3>
    <div>
      <input
        value={newInput}
        onChange={onChangeInputHandler}
        onKeyDown={onKeyPressHandler}
        />
      <button onClick={onClickButtonHandler} >+</button>
    </div>
    <ul>
      {
        props.tasks.map(t => {
          const onDelClick = () => props.removeTask(t.id);
          return (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={onDelClick}>x</button>
            </li>
          )
        })
      }
    </ul>
    <div>
      <button onClick={onAllCLickHandler}>All</button>
      <button onClick={onActiveCLickHandler}>Active</button>
      <button onClick={onCompletedCLickHandler}>Completed</button>
    </div>
  </div>
}
