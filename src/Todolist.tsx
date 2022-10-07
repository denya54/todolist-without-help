import React, {useCallback, useEffect} from "react";
import {AddItemComponent} from "./AddItemComponent";
import {ChangeSpan} from "./ChangeSpan";
import {Tasks} from "./Tasks";
import {Button, IconButton} from "@mui/material";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import {FilterType} from "./state/todolists-reducer";
import {getTasksTC, TaskType} from "./state/tasks-reducer";
import {useAppDispatch} from "./store/hooks";


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



export const Todolist = React.memo((props: TodolistPropsType) => {
    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(getTasksTC(props.todoID))
    }, [])

    let allTodolistTasks = props.tasks
    let tasksForTodo = allTodolistTasks
    if (props.filter === 'active') {
        tasksForTodo = allTodolistTasks.filter(t => t.isDone === false)
    } else if (props.filter === 'complete') {
        tasksForTodo = allTodolistTasks.filter(t => t.isDone === true)
    }

    const setFilter = useCallback((filterValue: FilterType) => {
        props.changeFilter(props.todoID, filterValue)
    }, [])

    const deleteTodo = useCallback(() => {
        props.deleteTodolist(props.todoID)
    }, [])

    const addTask = useCallback((taskTitle: string) => {
        props.addTask(props.todoID, taskTitle)
    }, [props.addTask, props.todoID])

    const changeTodoName = useCallback((newTodoName: string) => {
        props.changeTodoTitle(props.todoID, newTodoName)
    }, [])



    return (
        <div>
            <h3>
                <ChangeSpan title={props.title} changeFunc={changeTodoName}/>
                <IconButton onClick={deleteTodo} color="secondary" aria-label="add an alarm">
                <DeleteForeverTwoToneIcon />
            </IconButton>
            </h3>

            <AddItemComponent addItem={addTask}/>
            <Tasks tasks={tasksForTodo} deleteTask={props.deleteTask} changeTaskStatus={props.changeTaskStatus} todoID={props.todoID} changeTaskTitle={props.changeTaskTitle}/>

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
})