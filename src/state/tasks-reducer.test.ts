import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from './tasks-reducer'

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = removeTaskAC('todolistId2', '2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})

// test('new task should be added from correct array', () => {
//     const startState: TasksStateType = {
//         'todolistId1': [
//             {id: '1', title: 'CSS', isDone: false},
//             {id: '2', title: 'JS', isDone: true},
//             {id: '3', title: 'React', isDone: false}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', isDone: false},
//             {id: '2', title: 'milk', isDone: true},
//             {id: '3', title: 'tea', isDone: false}
//         ]
//     }
//     let taskFromServer = {
//         addedDate: '31-01',
//         deadline: null,
//         description: null,
//         id: '1',
//         order: 1,
//         priority: 1,
//         startDate: null,
//         status: 1,
//         title: 'task From server',
//         todoListId: '11'
//     }
//
//     const action = addTaskAC('todolistId2', taskFromServer)
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todolistId2'].length).toBe(4)
//     expect(endState['todolistId2'][0].title).toBe('task From server')
//
//     expect(endState['todolistId1'].length).toBe(3)
//     expect(endState['todolistId2'][0].id).toBeDefined()
//     expect(endState['todolistId2'][0].isDone).toBe(false)
//
// })

test('correct task should be change title', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = changeTaskTitleAC('todolistId2', '1', 'melon')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].title).toBe('melon')
    expect(endState['todolistId1'].length).toBe(3)

})

test('correct task should be change status', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = changeTaskStatusAC('todolistId2', '1', true)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].isDone).toBe(true)
    expect(endState['todolistId1'].length).toBe(3)

})