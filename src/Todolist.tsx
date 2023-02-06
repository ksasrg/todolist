import React, { useState } from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
}




export function Todolist(props: PropsType) {     

    // const onClickFilter = (filter: 'all' | 'active' | 'complete') => {
    //     if (filter == 'active') {
    //         setTasks(newTasks.filter(t => t.isDone == false));            
    //         return;
    //     }
    //     if (filter == 'complete') {
    //         setTasks(newTasks.filter(t => t.isDone == true));
    //         return;
    //     }
        
    //     setTasks(newTasks);
    // }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input />
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map((el) => {
                return (
                    <li key={el.id}>
                        <input type="checkbox" checked={el.isDone} />
                        <span>{el.title} </span>
                        <button onClick={() => props.removeTask(el.id)}>Del</button>
                    </li>

                )
            })}
        </ul>
        <div>
            {/* <button onClick={() => onClickFilter('all')}>All</button>
            <button onClick={() => onClickFilter('active')}>Active</button>
            <button onClick={() => onClickFilter('complete')}>Completed</button> */}
        </div>
    </div>
}
