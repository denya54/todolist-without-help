import React from "react";
import {FilterType, TaskType} from "./App";
import {AddItemComponent} from "./AddItemComponent";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (taskID: string) => void
    changeFilter: (filterValue: FilterType) => void
    addTask: (taskTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const deleteTask = (taskID: string) => {
        props.deleteTask(taskID)
    }

    const setFilter = (filterValue: FilterType) => {
        props.changeFilter(filterValue)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <AddItemComponent addItem={props.addTask}/>
            <ul> {props.tasks.map(t => <li key={t.id}><input type={'checkbox'}
                                                             checked={t.isDone}/><span>{t.title}</span>
                <button onClick={()=> deleteTask(t.id)}>x</button>
            </li>)}

            </ul>
            <button onClick={()=> setFilter('all')}>all</button>
            <button onClick={()=> setFilter('active')}>active</button>
            <button onClick={()=> setFilter('complete')}>complete</button>
        </div>
    )
}