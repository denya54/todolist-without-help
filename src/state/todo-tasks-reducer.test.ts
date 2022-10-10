import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {createTodolistAC, removeTodolistAC, todolistsReducer, TodolistType} from "./todolists-reducer";

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: 1},
            {id: '2', title: 'JS', status: 2},
            {id: '3', title: 'React', status: 1}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: 1},
            {id: '2', title: 'milk', status: 2},
            {id: '3', title: 'tea', status: 1}
        ]
    }
    let todoFromServer = {
        id: '1',
        addedDate: 'null',
        order: 10,
        title: 'todolist from server'
    }
    const action = createTodolistAC(todoFromServer)

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    let todoFromServer = {
        id: '1',
        addedDate: 'null',
        order: 10,
        title: 'todolist from server'
    }

    const action = createTodolistAC(todoFromServer)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: 1},
            {id: '2', title: 'JS', status: 2},
            {id: '3', title: 'React', status: 1}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: 1},
            {id: '2', title: 'milk', status: 2},
            {id: '3', title: 'tea', status: 1}
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})