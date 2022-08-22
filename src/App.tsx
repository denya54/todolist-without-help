import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'complete'


function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'html', isDone: true},
        {id: v1(), title: 'css', isDone: false},
        {id: v1(), title: 'js', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterType>('all')

    const deleteTask = (taskID: string) => {
        let tasksAfterDel = tasks.filter(t => t.id !== taskID)
        setTasks(tasksAfterDel)
    }

    const addTask = (taskTitle: string) => {
        let newTask = {id: v1(), title: taskTitle, isDone: false}
        setTasks([...tasks, newTask])
    }
    const changeFilter = (filterValue: FilterType) => {
        setFilter(filterValue)
    }

    let tasksForTodo = tasks
    if (filter === 'active') {
        tasksForTodo = tasks.filter(t => t.isDone === false)
    } else if (filter === 'complete') {
        tasksForTodo = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <Todolist title={'Learn'}
                      tasks={tasksForTodo}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      addTask={addTask}/>
        </div>
    );
}

export default App;
