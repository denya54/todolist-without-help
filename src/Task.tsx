import {Checkbox, IconButton} from "@mui/material";
import {ChangeSpan} from "./ChangeSpan";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import React, {useCallback} from "react";
import {TaskServerType, TaskType} from "./state/tasks-reducer";

type TaskPropsType = {
    task: TaskServerType
    todoID: string
    changeTaskStatus: (todoID: string, taskID: string, newStatus: number) => void
    changeTaskTitle: (todoID: string, taskID: string, newTitle: string) => void
    deleteTask: (todoID: string, taskID: string) => void
}

export const Task = (props: TaskPropsType) => {

    const deleteTask = useCallback((taskID: string) => {
        props.deleteTask(props.todoID, taskID)
    }, [props.deleteTask, props.todoID])

    const changeTaskStatus = useCallback((taskID: string, newTaskStatus: boolean) => {
        if (newTaskStatus) {
            props.changeTaskStatus(props.todoID, taskID, 2)
        } else {
            props.changeTaskStatus(props.todoID, taskID, 0)
        }
        // props.changeTaskStatus(props.todoID, taskID, newIsDone)
        // alert(newIsDone)
    }, [props.changeTaskStatus, props.todoID])

    const changeTaskTitle = useCallback(( newTitle: string) => {
        props.changeTaskTitle(props.todoID, props.task.id, newTitle)
    }, [props.changeTaskTitle, props.todoID, props.task.id])

    return (

            <li key={props.task.id} className={props.task.status === 2 ? 'task-complete' : ''}>
                <Checkbox color="secondary" checked={props.task.status === 2} onChange={(e => {
                    changeTaskStatus(props.task.id, e.currentTarget.checked)
                })}/>
                <ChangeSpan title={props.task.title} changeFunc={changeTaskTitle}/>
                <IconButton onClick={() => deleteTask(props.task.id)}>
                    <DeleteForeverTwoToneIcon/>
                </IconButton>
            </li>
    )
}