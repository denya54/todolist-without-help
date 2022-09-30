import {addTodolistAC, getTodolistsAC, removeTodolistAC} from "./todolists-reducer";
import {v1} from "uuid";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTaskType) => {
    switch (action.type) {
        case "tasks/REMOVE-TASK": {
            let stateCopy = {...state}
            let todolistTask = stateCopy[action.todoID]
            stateCopy[action.todoID] = todolistTask.filter(t => t.id !== action.taskID)
            return stateCopy
        }
        case "tasks/ADD-TASK": {
            let stateCopy = {...state}
            let newTask = {id: action.newTaskID, title: action.newTaskTitle, isDone: false}
            let todolistTask = stateCopy[action.todoID]
            stateCopy[action.todoID] = [newTask, ...todolistTask]

            return stateCopy
        }
        case "tasks/CHANGE-TASK-TITLE": {
            let stateCopy = {...state}
            let todolistTasks = stateCopy[action.todoID]
            stateCopy[action.todoID] = todolistTasks.map(t => t.id === action.taskID ? {...t, title: action.newTaskTitle} : t)
            return stateCopy
        }
        case "tasks/CHANGE-TASK-STATUS": {
            let stateCopy = {...state}
            let todolistTasks = stateCopy[action.todoID]
            stateCopy[action.todoID] = todolistTasks.map(t => t.id === action.taskID ? {...t, isDone: action.newTaskStatus} : t)
            return stateCopy
        }
        case "ADD-TODO": {
            let stateCopy = {...state}
            stateCopy[action.newTodoID] = []
            return stateCopy
        }
        case "REMOVE-TODO": {
            let stateCopy = {...state}
            delete stateCopy[action.todoID]
            return stateCopy
        }
        case 'GET-TODOLISTS': {
            let copyState = {...state}
            action.todolists.forEach(td => {
                copyState[td.id] = []
            })
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (todoID: string, taskID: string) => {
    return {type: 'tasks/REMOVE-TASK', todoID, taskID} as const
}

export const addTaskAC = (todoID: string, newTaskTitle: string) => {
    return {type: 'tasks/ADD-TASK', todoID, newTaskTitle, newTaskID: v1()} as const
}

export const changeTaskTitleAC = (todoID: string, taskID: string, newTaskTitle: string) => {
    return {type: 'tasks/CHANGE-TASK-TITLE', todoID, taskID, newTaskTitle} as const
}

export const changeTaskStatusAC = (todoID: string, taskID: string, newTaskStatus: boolean) => {
    return {type: 'tasks/CHANGE-TASK-STATUS', todoID, taskID, newTaskStatus} as const
}

type ActionsTaskType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof getTodolistsAC>
