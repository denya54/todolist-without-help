import React from "react";
import {FilterType, TaskType} from "./App";
import {AddItemComponent} from "./AddItemComponent";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (taskID: string) => void
    changeFilter: (filterValue: FilterType) => void
    addTask: (taskTitle: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean) => void
    filter: FilterType
}

export const Todolist = (props: TodolistPropsType) => {

    const deleteTask = (taskID: string) => {
        props.deleteTask(taskID)
    }

    const setFilter = (filterValue: FilterType) => {
        props.changeFilter(filterValue)
    }

    const changeTaskStatus = (taskID: string, newIsDone: boolean) => {
        props.changeTaskStatus(taskID, newIsDone)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <AddItemComponent addItem={props.addTask}/>
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