import React from "react";
import { TaskType} from "./App";
import {AddItemComponent} from "./AddItemComponent";
import {ChangeSpan} from "./ChangeSpan";
import {Tasks} from "./Tasks";
import {Button, IconButton} from "@mui/material";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import {FilterType} from "./state/todolists-reducer";


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
    changeTodoTitle: (todolistID: string, newTodoTitle: string) => void
    changeTaskTitle: (todolistID: string, taskID: string, newTodoTitle: string) => void
}



export const Todolist = (props: TodolistPropsType) => {

    const setFilter = (filterValue: FilterType) => {
        props.changeFilter(props.todoID, filterValue)
    }

    const deleteTodo = () => {
        props.deleteTodolist(props.todoID)
    }

    const addTask = (taskTitle: string) => {
        props.addTask(props.todoID, taskTitle)
    }

    const changeTodoName = (newTodoName: string) => {
        props.changeTodoTitle(props.todoID, newTodoName)
    }

    return (
        <div>
            <h3>
                <ChangeSpan title={props.title} changeFunc={changeTodoName}/>
                <IconButton onClick={deleteTodo} color="secondary" aria-label="add an alarm">
                <DeleteForeverTwoToneIcon />
            </IconButton>
            </h3>

            <AddItemComponent addItem={addTask}/>
            <Tasks tasks={props.tasks} deleteTask={props.deleteTask} changeTaskStatus={props.changeTaskStatus} todoID={props.todoID} changeTaskTitle={props.changeTaskTitle}/>

            <Button  onClick={() => setFilter('all')}  variant={props.filter=== 'all' ? 'contained' : 'outlined'} color="secondary">
                All
            </Button>
            <Button  onClick={() => setFilter('active')} variant={props.filter=== 'active' ? 'contained' : 'outlined'} color="secondary">
                Active
            </Button>
            <Button  onClick={() => setFilter('complete')}  variant={props.filter=== 'complete' ? 'contained' : 'outlined'} color="secondary">
                Complete
            </Button>

        </div>
    )
}