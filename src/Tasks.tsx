import React from "react";
import {TaskType} from "./App";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import {Checkbox, IconButton} from "@mui/material";
import {ChangeSpan} from "./ChangeSpan";

type TasksPropsType = {
    tasks: Array<TaskType>
    deleteTask: (todolistID: string, taskID: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, newIsDoneValue: boolean) => void
    todoID: string
    changeTaskTitle: (todolistID: string, taskID: string, newTodoTitle: string) => void
}

export const Tasks = (props: TasksPropsType) => {
    const deleteTask = (taskID: string) => {
        props.deleteTask(props.todoID, taskID)
    }
    const changeTaskStatus = (taskID: string, newIsDone: boolean) => {
        props.changeTaskStatus(props.todoID, taskID, newIsDone)
    }

    return (
        <ul> {props.tasks.map(t => {
            const changeTaskTitle = (newTitle: string) => {
                props.changeTaskTitle(props.todoID, t.id, newTitle)
            }

            return <li key={t.id} className={t.isDone ? 'task-complete' : ''}>
                <Checkbox color="secondary" checked={t.isDone} onChange={(e => {
                    changeTaskStatus(t.id, e.currentTarget.checked)
                })}/>
                <ChangeSpan title={t.title} changeFunc={changeTaskTitle}/>
                <IconButton onClick={() => deleteTask(t.id)}>
                    <DeleteForeverTwoToneIcon/>
                </IconButton>
            </li>
        })}

        </ul>
    )
}