import React from 'react';
import './App.css';
import Todolist, { TaskType } from './Todolist';

function App() {
    const tasks1: Array<TaskType> = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 3, title: "ReactJS", isDone: false }
    ]

    // const tasks2: TaskType[] = [];

    // const tasks2 = [];

    const tasks2: TaskType[] = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false }
    ]


    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks1} />
            <Todolist title="Songs" tasks={tasks2} />
            {/* <Todolist title="Books" /> */}
        </div>
    );
}




export default App;
