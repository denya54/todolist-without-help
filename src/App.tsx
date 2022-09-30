import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemComponent} from "./AddItemComponent";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodolistAC,
    changeTodoFilterAC,
    changeTodoTitleAC,
    FilterType, getTodolistsAC,
    removeTodolistAC,
    TodolistType
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {todoAPI} from "./api/api";


function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()


    const deleteTask = useCallback((todolistID: string, taskID: string) => {dispatch(removeTaskAC(todolistID, taskID))}, [])
    const addTask = useCallback((todolistID: string, taskTitle: string) => {
        dispatch(addTaskAC(todolistID, taskTitle))
    },[])

    const changeTaskStatus = useCallback((todolistID: string, taskID: string, newIsDoneValue: boolean) => {dispatch(changeTaskStatusAC(todolistID, taskID, newIsDoneValue))}, [])
    const changeTaskTitle = useCallback((todolistID: string, taskID: string, newTaskTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, newTaskTitle))
    }, [])

    const changeFilter = useCallback((todolistID: string, filterValue: FilterType) => {dispatch(changeTodoFilterAC(todolistID, filterValue))}, [])
    const deleteTodolist = useCallback((todolistID: string) => {dispatch(removeTodolistAC(todolistID))}, [])
    const addTodolist = useCallback((todolistTitle: string) => {dispatch(addTodolistAC(todolistTitle))}, [])
    const changeTodolistTitle = useCallback((todolistID: string, newTodoTitle: string) => {dispatch(changeTodoTitleAC(todolistID, newTodoTitle))}, [])


    useEffect(() => {
        todoAPI.getTodo()
            .then((res) => {
                dispatch(getTodolistsAC(res.data))
            })

    }, [])


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

                        return <Grid item key={todo.id}>
                            <Paper style={{padding: '10px'}}>
                            <Todolist key={todo.id}
                                      title={todo.title}
                                      todoID={todo.id}
                                      tasks={tasks[todo.id]}
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
