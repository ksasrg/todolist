import React, { FC } from 'react';
import { filterType } from './App';
import TasksList from "./TasksList";

type TodoListPropsType = {
  title: string
  tasks: TaskType[]
  changeFilter: (filter: filterType) => void
  removeTask: (taskId: number) => void
}

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props): JSX.Element => {
  return (
    <div className={"todolist"}>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <TasksList tasks={props.tasks} removeTask={props.removeTask} />
      <div>
        <button
          onClick={() => props.changeFilter('all')}
        >All
        </button>
        <button
          onClick={() => props.changeFilter('active')}
        >Active
        </button>
        <button
          onClick={() => props.changeFilter('complete')}
        >Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;