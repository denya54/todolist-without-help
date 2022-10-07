import { createTodolistAC, getTodolistsAC, removeTodolistAC} from "./todolists-reducer";
import {v1} from "uuid";
import {AppThunk} from "../store/store";
import {todoAPI} from "../api/api";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TaskServerType = {
    addedDate: string
    deadline: string | null
    description: string | null
    id: string
    order: number
    priority: number
    startDate: string | null
    status: number
    title: string
    todoListId: string
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
            let newTask = {id: action.task.id, title: action.task.title, isDone: false}
            const tasks = stateCopy[action.task.todoListId];
            stateCopy[action.task.todoListId] = [newTask, ...tasks]

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
        case "CREATE-TODOLIST": {
            let stateCopy = {...state}
            stateCopy[action.todolist.id] = []
            return stateCopy
        }
        case "tasks/GET-TASKS": {
            return state

        }
        default:
            return state
    }
}

export const removeTaskAC = (todoID: string, taskID: string) => {
    return {type: 'tasks/REMOVE-TASK', todoID, taskID} as const
}

export const addTaskAC = (todoID: string, task: TaskServerType) => {
    return {type: 'tasks/ADD-TASK', todoID, task} as const
}

export const changeTaskTitleAC = (todoID: string, taskID: string, newTaskTitle: string) => {
    return {type: 'tasks/CHANGE-TASK-TITLE', todoID, taskID, newTaskTitle} as const
}

export const changeTaskStatusAC = (todoID: string, taskID: string, newTaskStatus: boolean) => {
    return {type: 'tasks/CHANGE-TASK-STATUS', todoID, taskID, newTaskStatus} as const
}

export const getTasksAC = (tasks: Array<TaskServerType>) => {
    return {type: 'tasks/GET-TASKS', tasks} as const
}

export const getTasksTC = (todoID: string) : AppThunk => {
    return (dispatch) => {
        todoAPI.getTasks(todoID)
            .then((res)=> {

                dispatch(getTasksAC(res.data.items))
            })
    }
}

export const createTaskTC = (todoID: string, newTaskTitle: string) : AppThunk => {
    return (dispatch) => {
        todoAPI.createTask(todoID, newTaskTitle)
            .then((res) => {
                debugger
                let task = res.data.data.item
                dispatch(addTaskAC(todoID, task))
            })
    }
}

export type ActionsTaskType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof getTodolistsAC>
    | ReturnType<typeof createTodolistAC>
    | ReturnType<typeof getTasksAC>
