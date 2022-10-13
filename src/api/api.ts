import axios from "axios";
import { TodoServerType} from "../state/todolists-reducer";
import {TaskServerType} from "../state/tasks-reducer";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '089d3e24-70d2-4632-9ce2-42855d61866e'
    }
})


export const todoAPI = {

    getTodo() {
        return instance.get<Array<TodoServerType>>('todo-lists')
    },
    createTodo(newTodoTitle: string) {
        return instance.post<CreateTodoResponseType>('todo-lists', {title: newTodoTitle})
    },
    deleteTodo(todolistID: string) {
        return instance.delete<UpdDelTodoResponseType>(`/todo-lists/${todolistID}`)
    },
    updateTodo(todolistID: string, newTodoTitle: string) {
        return instance.put<UpdDelTodoResponseType>(`/todo-lists/${todolistID}`, {title: newTodoTitle})
    },


    getTasks(todolistID: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistID}/tasks`)
    },
    createTask(todolistID: string, newTaskTitle: string) {
        return instance.post<CreateTaskResponse>(`/todo-lists/${todolistID}/tasks`, {title: newTaskTitle})
    },
    deleteTask(todolistID: string, taskID: string) {
        return instance.delete<DelTaskResponse>(`/todo-lists/${todolistID}/tasks/${taskID}`)
    },
    updateTask(todolistID: string, taskID: string, model: UpdateTaskModelType) {
        return instance.put<UpdTaskResponse>(`/todo-lists/${todolistID}/tasks/${taskID}`, {model})
    }

}

type GetTasksResponse = {
    error: string | null
    items: Array<TaskServerType>
    totalCount: number
}

type CreateTaskResponse = {
    data: {item: TaskServerType}
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

type DelTaskResponse = {
    data: {}
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

type UpdTaskResponse = {
    data: {item: TaskServerType}
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type CreateTodoResponseType = {
    data: {item: TodoServerType}
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

type UpdDelTodoResponseType = {
    data: {}
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}