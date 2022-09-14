import {todolistsReducer, TodolistType} from './todolists-reducer'
import { v1 } from 'uuid'

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, {type: 'REMOVE-TODO', todoID: todolistId1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('new todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let todolistId3 = v1()

    let todoTitle = 'HZ'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, {type: 'ADD-TODO', newTodoID: todolistId3, newTodoTitle: todoTitle})

    expect(endState.length).toBe(3)
    expect(endState[2].id).toBe(todolistId3)
    expect(endState[2].title).toBe("HZ")
})

test('correct todolist should be change title', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'HELLO'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, {type: 'CHANGE-TODO-TITLE', todoID: todolistId1, newTodoTitle: newTodolistTitle})

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist filter should be change', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()



    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, {type: 'CHANGE-TODO-FILTER', todoID: todolistId1, newTodoFilter: 'active'})

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('active')
})