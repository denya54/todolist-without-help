import {Checkbox, IconButton} from "@mui/material";
import {ChangeSpan} from "./ChangeSpan";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import React, {useCallback} from "react";
import {TaskType} from "./state/tasks-reducer";

type TaskPropsType = {
    task: TaskType
    todoID: string
    changeTaskStatus: (todoID: string, taskID: string, newStatus: boolean) => void
    changeTaskTitle: (todoID: string, taskID: string, newTitle: string) => void
    deleteTask: (todoID: string, taskID: string) => void
}

export const Task = (props: TaskPropsType) => {

    const deleteTask = useCallback((taskID: string) => {
        props.deleteTask(props.todoID, taskID)
    }, [props.deleteTask, props.todoID])

    const changeTaskStatus = useCallback((taskID: string, newIsDone: boolean) => {
        props.changeTaskStatus(props.todoID, taskID, newIsDone)
    }, [props.changeTaskStatus, props.todoID])

    const changeTaskTitle = useCallback(( newTitle: string) => {
        props.changeTaskTitle(props.todoID, props.task.id, newTitle)
    }, [props.changeTaskTitle, props.todoID, props.task.id])

    return (

            <li key={props.task.id} className={props.task.isDone ? 'task-complete' : ''}>
                <Checkbox color="secondary" checked={props.task.isDone} onChange={(e => {
                    changeTaskStatus(props.task.id, e.currentTarget.checked)
                })}/>
                <ChangeSpan title={props.task.title} changeFunc={changeTaskTitle}/>
                <IconButton onClick={() => deleteTask(props.task.id)}>
                    <DeleteForeverTwoToneIcon/>
                </IconButton>
            </li>
    )
}