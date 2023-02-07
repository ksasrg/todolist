import React, { useState } from 'react';
import './App.css';
import TodoList, { TaskType } from "./Todolist";

export type filterType = 'all' | 'active' | 'complete';

function App(): JSX.Element {
  //BLL:
  const todoListTitle: string = "What to learn"

  const [tasks, setTasks] = useState<TaskType[]>([
    { id: 1, title: "HTML & CSS", isDone: true },
    { id: 2, title: "ES6 & TS", isDone: true },
    { id: 3, title: "React & Redux", isDone: false }
  ]);

  const removeTask = (taskId: number) => {
    const updTasks = tasks.filter(t => t.id !== taskId);
    setTasks(updTasks);
  }

  const [filter, setFilter] = useState<filterType>('all');
  const changeFilter = (filter: filterType) => setFilter(filter);

  let filteredTasks: Array<TaskType> = tasks;

  if (filter === 'active') {
    filteredTasks = tasks.filter(t => t.isDone === false)
  }
  if (filter === 'complete') {
    filteredTasks = tasks.filter(t => t.isDone === true)
  }

  //UI:
  return (
    <div className="App">
      <TodoList
        title={todoListTitle}
        tasks={filteredTasks}
        changeFilter={changeFilter}
        removeTask={removeTask}
      />
    </div>
  );
}

export default App;
