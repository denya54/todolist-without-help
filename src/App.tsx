import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemComponent} from "./AddItemComponent";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodolistAC,
    changeTodoFilterAC,
    changeTodoTitleAC,
    FilterType,
    removeTodolistAC,
    TodolistType
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";


function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()


    const deleteTask = (todolistID: string, taskID: string) => {dispatch(removeTaskAC(todolistID, taskID))}
    const addTask = (todolistID: string, taskTitle: string) => {dispatch(addTaskAC(todolistID, taskTitle))}
    const changeTaskStatus = (todolistID: string, taskID: string, newIsDoneValue: boolean) => {dispatch(changeTaskStatusAC(todolistID, taskID, newIsDoneValue))}
    const changeTaskTitle = (todolistID: string, taskID: string, newTaskTitle: string) => {dispatch(changeTaskTitleAC(todolistID, taskID, newTaskTitle))}

    const changeFilter = (todolistID: string, filterValue: FilterType) => {dispatch(changeTodoFilterAC(todolistID, filterValue))}
    const deleteTodolist = (todolistID: string) => {dispatch(removeTodolistAC(todolistID))}
    const addTodolist = (todolistTitle: string) => {dispatch(addTodolistAC(todolistTitle))}
    const changeTodolistTitle = (todolistID: string, newTodoTitle: string) => {dispatch(changeTodoTitleAC(todolistID, newTodoTitle))}



    return (
        <div className="App">
            <AppBar position="static" color={'secondary'}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemComponent addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map(todo => {
                        let allTodolistTasks = tasks[todo.id]
                        let tasksForTodo = allTodolistTasks
                        if (todo.filter === 'active') {
                            tasksForTodo = allTodolistTasks.filter(t => t.isDone === false)
                        } else if (todo.filter === 'complete') {
                            tasksForTodo = allTodolistTasks.filter(t => t.isDone === true)
                        }
                        return <Grid item key={todo.id}>
                            <Paper style={{padding: '10px'}}>
                            <Todolist key={todo.id}
                                      title={todo.title}
                                      todoID={todo.id}
                                      tasks={tasksForTodo}
                                      deleteTask={deleteTask}
                                      changeFilter={changeFilter}
                                      addTask={addTask}
                                      changeTaskStatus={changeTaskStatus}
                                      filter={todo.filter}
                                      deleteTodolist={deleteTodolist}
                                      changeTodoTitle={changeTodolistTitle}
                                      changeTaskTitle={changeTaskTitle}
                            />
                                </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
