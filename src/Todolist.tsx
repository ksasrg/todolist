

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
}

const Todolist: React.FC<TodolistPropsType> = (props) => {

  const taskItems: JSX.Element | JSX.Element[]  = props.tasks.length
    ? props.tasks.map((task) => {
      return (
        <li key={task.id}>
          <input type="checkbox" checked={task.isDone} />
          <span>{task.title}</span>
        </li>
      )
    })
    : <span>empty tasklist</span>;

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {taskItems}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
};

export default Todolist;
