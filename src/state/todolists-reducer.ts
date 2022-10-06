
import {todoAPI} from "../api/api";
import {AppThunk} from "../store/store";

export type FilterType = 'all' | 'active' | 'complete'

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterType
}

export type TodoServerType = {
    id: string,
    addedDate: string,
    order: number,
    title: string
}

type TodolistsStateType = Array<TodolistType>

const initialState: TodolistsStateType = []

export const todolistsReducer = (state: TodolistsStateType = initialState, action: ActionsTodoType) => {
    switch (action.type) {
        case "REMOVE-TODO":
            return state.filter(td => td.id !== action.todoID)
        case "CHANGE-TODO-TITLE":
            return state.map(td => td.id === action.todoID ? {...td, title: action.newTodoTitle} : td)
        case "CHANGE-TODO-FILTER":
            return state.map(td => td.id === action.todoID ? {...td, filter: action.newTodoFilter} : td)
        case "GET-TODOLISTS":
            let todolistsFromServer = action.todolists.map(td => {
                return {...td, filter: 'all'}
            })
            return todolistsFromServer
        case "CREATE-TODOLIST":
            let newTodolist = {id: action.todolist.id, title: action.todolist.title, filter: 'all'}
            return [newTodolist, ...state]

        default:
            return state
    }
}

export const removeTodolistAC = (todoID: string) => {
    return {type: 'REMOVE-TODO', todoID} as const
}

export const changeTodoTitleAC = (todoID: string, newTodoTitle: string) => {
    return {type: 'CHANGE-TODO-TITLE', todoID, newTodoTitle} as const
}

export const changeTodoFilterAC = (todoID: string, newTodoFilter: FilterType) => {
    return {type: 'CHANGE-TODO-FILTER', todoID, newTodoFilter} as const
}

export const getTodolistsAC = (todolists: Array<TodoServerType>) => {
    return {type: 'GET-TODOLISTS', todolists} as const
}
export const createTodolistAC = (todolist: TodoServerType) => {
    return {type: 'CREATE-TODOLIST', todolist} as const
}




export const getTodolistsTC = (): AppThunk => {
    return (dispatch) => {
        todoAPI.getTodo()
            .then((res) => {
                dispatch(getTodolistsAC(res.data))
            })
    }
}

export const createTodolistTC = (newTodoTitle: string): AppThunk => {
    return (dispatch) => {
        todoAPI.createTodo(newTodoTitle)
            .then((res) => {
                debugger
                dispatch(createTodolistAC(res.data.item))
            })
    }
}
export const deleteTodolistTC = (todolistID: string): AppThunk => {
    return (dispatch) => {
        todoAPI.deleteTodo(todolistID)
            .then((res) => {
                debugger
                dispatch(removeTodolistAC(todolistID))
            })
    }
}

export type ActionsTodoType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeTodoTitleAC>
    | ReturnType<typeof changeTodoFilterAC>
    | ReturnType<typeof getTodolistsAC>
    | ReturnType<typeof createTodolistAC>
