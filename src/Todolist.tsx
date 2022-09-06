import React from "react";
import {FilterType, TaskType} from "./App";
import {AddItemComponent} from "./AddItemComponent";

type TodolistPropsType = {
    title: string
    todoID: string
    tasks: Array<TaskType>
    deleteTask: (todolistID: string, taskID: string) => void
    changeFilter: (todolistID: string, filterValue: FilterType) => void
    addTask: (todolistID: string, taskTitle: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, newIsDoneValue: boolean) => void
    filter: FilterType
    deleteTodolist: (todoID: string) => void
}



export const Todolist = (props: TodolistPropsType) => {

    const deleteTask = (taskID: string) => {
        props.deleteTask(props.todoID, taskID)
    }

    const setFilter = (filterValue: FilterType) => {
        props.changeFilter(props.todoID, filterValue)
    }

    const changeTaskStatus = (taskID: string, newIsDone: boolean) => {
        props.changeTaskStatus(props.todoID, taskID, newIsDone)
    }

    const deleteTodo = () => {
        props.deleteTodolist(props.todoID)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={deleteTodo}>x</button>
            <AddItemComponent addItem={props.addTask} todoID={props.todoID}/>
            <ul> {props.tasks.map(t => <li key={t.id} className={t.isDone ? 'task-complete' : ''}><input type={'checkbox'}
                                                             checked={t.isDone}
                                                             onChange={(e => {
                                                                 changeTaskStatus(t.id, e.currentTarget.checked)
                                                             })}/><span >{t.title}</span>
                <button onClick={() => deleteTask(t.id)}>x</button>
            </li>)}

            </ul>
            <button onClick={() => setFilter('all')} className={props.filter=== 'all' ? 'button-active' : ''}>all</button>
            <button onClick={() => setFilter('active')}  className={props.filter=== 'active' ? 'button-active' : ''}>active</button>
            <button onClick={() => setFilter('complete')}  className={props.filter=== 'complete' ? 'button-active' : ''}>complete</button>
        </div>
    )
}