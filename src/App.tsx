import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type AllTaskType = {
    [key: string]: TaskType[]
}

function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    let [todoLists, setTodoLIsts] = useState<TodoListType[]>([
        { id: todoListId1, title: 'What to learn', filter: 'active' },
        { id: todoListId2, title: 'What to buy', filter: 'completed' },
    ])

    let [allTasks, setAllTasks] = useState<AllTaskType>({
        [todoListId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todoListId2]: [
            { id: v1(), title: "book", isDone: true },
            { id: v1(), title: "milk", isDone: true },

        ],
    })

    function removeTask(id: string, todoListId: string) {
        const tasks = allTasks[todoListId]
        const filteredTasks = tasks.filter(t => t.id !== id);
        allTasks[todoListId] = filteredTasks
        setAllTasks({ ...allTasks });
    }

    function addTask(title: string, todoListId: string) {
        const task = { id: v1(), title: title, isDone: false };
        const tasks = allTasks[todoListId]
        const newTasks = [task, ...tasks];
        allTasks[todoListId] = newTasks
        setAllTasks({ ...allTasks });
    }

    const changeStatus = (taskId: string, checked: boolean, todoListId: string) => {
        const tasks = allTasks[todoListId]
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = checked
            setAllTasks({ ...allTasks });
        }

    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        const todoList = todoLists.find(el => el.id == todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLIsts([...todoLists])
        }
    }

    const removeList = (todoListId: string) => {
        setTodoLIsts(todoLists.filter(tl => tl.id !== todoListId))
        delete allTasks[todoListId]
        setAllTasks({ ...allTasks })
    }

    function addTodoList(title: string) {
        const todoListId = v1()
        setTodoLIsts([{ id: todoListId, title: title, filter: 'all' }, ...todoLists,])
        setAllTasks({ ...allTasks, [todoListId]: [] })
    }

    const changeListTitle = (todoListId: string, title: string) => {
        setTodoLIsts(todoLists.map(
            tl => tl.id === todoListId ? { ...tl, title: title } : tl
        ))
    }

    const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
        setAllTasks({
            ...allTasks,
            [todoListId]: allTasks[todoListId].map(
                t => t.id === taskId ? { ...t, title: title } : t)
        })
    }

    // { id: todoListId1, title: 'What to learn', filter: 'active' },

    // [todoListId2]: [
    //     { id: v1(), title: "book", isDone: true },
    //     { id: v1(), title: "milk", isDone: true },

    // ],

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />

            {
                todoLists.map((tl) => {

                    let tasksForTodolist = allTasks[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = allTasks[tl.id].filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTasks[tl.id].filter(t => t.isDone === true);
                    }

                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={tl.filter}
                            removeList={removeList}
                            changeTaskTitle={changeTaskTitle}
                            changeListTitle={changeListTitle}
                        />
                    )
                })
            }


        </div>
    );
}

export default App;
