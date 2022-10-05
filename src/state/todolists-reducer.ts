import {v1} from "uuid";
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
        case "ADD-TODO":
            let newTodo = {id: action.newTodoID, title: action.newTodoTitle, filter: 'all'}
            return [...state, newTodo]
        case "CHANGE-TODO-TITLE":
            return state.map(td => td.id === action.todoID ? {...td, title: action.newTodoTitle} : td)
        case "CHANGE-TODO-FILTER":
            return state.map(td => td.id === action.todoID ? {...td, filter: action.newTodoFilter} : td)
        case "GET-TODOLISTS":
            let todolistsFromServer = action.todolists.map(td => {
                return {...td, filter: 'all'}
            })
            return todolistsFromServer
        default:
            return state
    }
}

export const removeTodolistAC = (todoID: string) => {
    return {type: 'REMOVE-TODO', todoID} as const
}

export const addTodolistAC = (newTodoTitle: string) => {
    return {type: 'ADD-TODO', newTodoID: v1(), newTodoTitle} as const
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

export const getTodolistsTC = (): AppThunk => {
    return (dispatch) => {
        todoAPI.getTodo()
            .then((res) => {
                dispatch(getTodolistsAC(res.data))
            })
    }
}

export type ActionsTodoType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodoTitleAC>
    | ReturnType<typeof changeTodoFilterAC>
    | ReturnType<typeof getTodolistsAC>