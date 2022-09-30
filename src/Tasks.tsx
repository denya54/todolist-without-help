import React from "react";

import {TaskType} from "./state/tasks-reducer";
import {Task} from "./Task";

type TasksPropsType = {
    tasks: Array<TaskType>
    deleteTask: (todolistID: string, taskID: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, newIsDoneValue: boolean) => void
    todoID: string
    changeTaskTitle: (todolistID: string, taskID: string, newTodoTitle: string) => void
}

export const Tasks = (props: TasksPropsType) => {


    return (

        <ul> {props.tasks.map(t => {

            return <Task task={t}
                         todoID={props.todoID}
                         changeTaskStatus={props.changeTaskStatus}
                         changeTaskTitle={props.changeTaskTitle}
                         deleteTask={props.deleteTask}/>
        })}

        </ul>
    )
}