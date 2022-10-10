import axios from "axios";
import {getTodolistsAC, TodoServerType} from "../state/todolists-reducer";
import {useDispatch} from "react-redux";


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '089d3e24-70d2-4632-9ce2-42855d61866e'
    }
}

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
        return instance.post('todo-lists', {title: newTodoTitle})
    },
    deleteTodo(todolistID: string) {
        return instance.delete(`/todo-lists/${todolistID}`)
    },


    getTasks(todolistID: string) {
        return instance.get(`/todo-lists/${todolistID}/tasks`)
    },
    createTask(todolistID: string, newTaskTitle: string){
        return instance.post(`/todo-lists/${todolistID}/tasks`, {title: newTaskTitle })
    },
    deleteTask(todolistID: string, taskID: string){
        return instance.delete(`/todo-lists/${todolistID}/tasks/${taskID}`)
    },
    updateTask(todolistID: string, taskID: string, model: UpdateTaskModelType){
        return instance.put(`/todo-lists/${todolistID}/tasks/${taskID}`, {model})
    }

}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}