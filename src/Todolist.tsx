import React, { useState } from 'react';

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
}

type filterType = 'all' | 'active' | 'complete';

export function Todolist(props: PropsType) {

  let [tasks, setTasks] = useState<TaskType[]>(props.tasks);

  const onClickDel = (taskId: number) => {
    setTasks(tasks.filter(t => t.id !== taskId));    
  }
  

  const [filter, setFilter] = useState<filterType>('all');
  const onClickFilter = (filter: filterType) => setFilter(filter);

  let filteredTasks = tasks;

  if (filter == 'active') {
    filteredTasks = tasks.filter(t => t.isDone == false);
  }
  if (filter == 'complete') {
    filteredTasks = tasks.filter(t => t.isDone == true);
  }

  return <div>
    <h3>{props.title}</h3>
    <div>
      <input />
      <button>+</button>
    </div>
    <ul>
      {filteredTasks.map((el) => {
        return (
          <li key={el.id}>
            <input type="checkbox" checked={el.isDone} onChange={()=>{}} />
            <span>{el.title} </span>
            <button
              onClick={() => onClickDel(el.id)}>X</button>
          </li>
        )
      })}
    </ul>
    <div>
      <button onClick={() => onClickFilter('all')}>All</button>
      <button onClick={() => onClickFilter('active')}>Active</button>
      <button onClick={() => onClickFilter('complete')}>Completed</button>
    </div>
  </div>
}
