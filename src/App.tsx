import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterType
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type FilterType = 'all' | 'active' | 'complete'


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What Learn', filter: 'all'},
        {id: todolistID2, title: 'What Buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
            [todolistID1]: [
                {id: v1(), title: 'html', isDone: true},
                {id: v1(), title: 'css', isDone: false},
                {id: v1(), title: 'js', isDone: false}
            ],
            [todolistID2]: [
                {id: v1(), title: 'beer', isDone: true},
                {id: v1(), title: 'bread', isDone: false},
                {id: v1(), title: 'butter', isDone: false}
            ]
        }
    )

    const deleteTask = (todolistID: string, taskID: string) => {
        let todolistTask = tasks[todolistID]
        tasks[todolistID] = todolistTask.filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    const addTask = (todolistID: string, taskTitle: string) => {
        let newTask = {id: v1(), title: taskTitle, isDone: false}
        let todolistTask = tasks[todolistID]
        tasks[todolistID] = [newTask, ...todolistTask]
        setTasks({...tasks})
    }
    const changeFilter = (todolistID: string, filterValue: FilterType) => {
        let newTodos = todolists.map(td => td.id === todolistID ? {...td, filter: filterValue} : td)
        setTodolists(newTodos)
    }
    const changeTaskStatus = (todolistID: string, taskID: string, newIsDoneValue: boolean) => {
        let todolistTask = tasks[todolistID]
        tasks[todolistID] = todolistTask.map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)
        setTasks({...tasks})
    }

    const deleteTodolist = (todolistID: string) => {
        let newListTodo = todolists.filter(td => td.id !== todolistID)
        delete tasks[todolistID]
        setTodolists(newListTodo)
    }

    return (
        <div className="App">
            {todolists.map(todo => {
                let allTodolistTasks = tasks[todo.id]
                let tasksForTodo = allTodolistTasks
                if (todo.filter === 'active') {
                    tasksForTodo = allTodolistTasks.filter(t => t.isDone === false)
                } else if (todo.filter === 'complete') {
                    tasksForTodo = allTodolistTasks.filter(t => t.isDone === true)
                }
                return <Todolist key={todo.id}
                                 title={todo.title}
                                 todoID={todo.id}
                                 tasks={tasksForTodo}
                                 deleteTask={deleteTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeTaskStatus={changeTaskStatus}
                                 filter={todo.filter}
                                 deleteTodolist={deleteTodolist}
                />
            })}


        </div>
    );
}

export default App;
