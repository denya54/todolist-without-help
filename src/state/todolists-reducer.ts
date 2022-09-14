import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'complete'

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterType
}

type TodolistsStateType = Array<TodolistType>

export const todolistsReducer = (state: TodolistsStateType, action: ActionsTodoType) => {
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
        default:
            return state
    }
}

export const removeTodolistAC = (todoID: string) => {
    return {type: 'REMOVE-TODO', todoID} as const
}

export const addTodolistAC = ( newTodoTitle: string) => {
    return {type: 'ADD-TODO', newTodoID: v1(), newTodoTitle} as const
}

export const changeTodoTitleAC = (todoID: string, newTodoTitle: string) => {
    return {type: 'CHANGE-TODO-TITLE', todoID, newTodoTitle} as const
}

export const changeTodoFilterAC = (todoID: string, newTodoFilter: FilterType) => {
    return {type: 'CHANGE-TODO-FILTER', todoID, newTodoFilter} as const
}

type ActionsTodoType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodoTitleAC>
    | ReturnType<typeof changeTodoFilterAC>