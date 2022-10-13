import {createTodolistAC, getTodolistsAC, removeTodolistAC} from "./todolists-reducer";
import {AppRootStateType, AppThunk} from "../store/store";
import {todoAPI} from "../api/api";


export type TaskType = {
    id: string,
    title: string,
    status: number
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
            let newTask = {id: action.task.id, title: action.task.title, status: action.task.status}
            const tasks = stateCopy[action.task.todoListId];
            stateCopy[action.task.todoListId] = [newTask, ...tasks]

            return stateCopy
        }
        case "tasks/CHANGE-TASK-TITLE": {
            let stateCopy = {...state}
            let todolistTasks = stateCopy[action.todoID]
            stateCopy[action.todoID] = todolistTasks.map(t => t.id === action.taskID ? {
                ...t,
                title: action.newTaskTitle
            } : t)
            return stateCopy
        }
        case "tasks/CHANGE-TASK-STATUS": {
            let stateCopy = {...state}
            let todolistTasks = stateCopy[action.todoID]
            stateCopy[action.todoID] = todolistTasks.map(t => t.id === action.taskID ? {
                ...t,
                status: action.newTaskStatus
            } : t)
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
            let stateCopy = {...state}
            stateCopy[action.todoID] = action.tasks
            return stateCopy

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

export const changeTaskStatusAC = (todoID: string, taskID: string, newTaskStatus: number) => {
    return {type: 'tasks/CHANGE-TASK-STATUS', todoID, taskID, newTaskStatus} as const
}

export const getTasksAC = (todoID: string, tasks: Array<TaskServerType>) => {
    return {type: 'tasks/GET-TASKS', todoID, tasks} as const
}

export const getTasksTC = (todoID: string): AppThunk => {
    return (dispatch) => {
        todoAPI.getTasks(todoID)
            .then((res) => {
                dispatch(getTasksAC(todoID, res.data.items))
            })
    }
}


export const createTaskTC = (todoID: string, newTaskTitle: string): AppThunk => {
    return (dispatch) => {
        todoAPI.createTask(todoID, newTaskTitle)
            .then((res) => {
                let task = res.data.data.item
                dispatch(addTaskAC(todoID, task))
            })
    }
}

export const deleteTaskTC = (todoID: string, taskID: string): AppThunk => {
    return (dispatch) => {
        todoAPI.deleteTask(todoID, taskID)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(todoID, taskID))
                }

            })
    }
}

export const changeTaskStatusTC = (todoID: string, taskID: string, newStatus: number): AppThunk => {
    return (dispatch, getState: () => AppRootStateType) => {
        let allTasks = getState().tasks
        let tasksFromCurrentTodo = allTasks[todoID]
        let currentTask = tasksFromCurrentTodo.find(t => t.id === taskID)

        if (currentTask) {
            todoAPI.updateTask(todoID, taskID, {
                title: currentTask.title,
                description: '1',
                status: newStatus,
                priority: 0,
                startDate: '1',
                deadline: '1'
            })
                .then((res) => {
                    debugger
                    if (res.data.resultCode === 0) {
                        dispatch(changeTaskStatusAC(todoID, taskID, res.data.data.item.status))
                    }
                })
        }
    }
}

export const changeTaskTitleTC = (todoID: string, taskID: string, newTitle: string): AppThunk => {
    return (dispatch, getState: () => AppRootStateType) => {
        let tasks = getState().tasks
        let tasksForTodo = tasks[todoID]
        let currentTask = tasksForTodo.find(t => t.id === taskID)
        if(currentTask) {
            todoAPI.updateTask(todoID, taskID, {
                title: newTitle,
                description: '',
                status: currentTask.status,
                priority: 0,
                startDate: '',
                deadline: ''
            })
                .then((res) => {
                    debugger
                    dispatch(changeTaskTitleAC(todoID, taskID, res.data.data.item.title))
                })
        }
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
