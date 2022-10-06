import {createTodolistAC, getTodolistsAC, todolistsReducer, TodolistType} from './todolists-reducer'
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


    let todoFromServer = {
        id: '1',
        addedDate: 'null',
        order: 10,
        title: 'todolist from server'
    }

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState,  createTodolistAC(todoFromServer))

    expect(endState.length).toBe(3)
    expect(endState[0].id).toBe(todoFromServer.id)
    expect(endState[0].title).toBe('todolist from server')
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

test('todolists should be show on the screen', () => {
    const todolistsFromServ = [
        {id: '1', addedDate: '11-05-94', order: 0, title: 'First'},
        {id: '2', addedDate: '12-05-94', order: 0, title: 'Second'},
    ]



    const startState: Array<TodolistType> = [
    ]

    const endState = todolistsReducer(startState, getTodolistsAC(todolistsFromServ))

    expect(endState.length).toBe(2)
    expect(startState.length).toBe(0)
    expect(endState[0].title).toBe('First')
})