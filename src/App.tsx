import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemComponent} from "./AddItemComponent";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {

    changeTodoFilterAC, changeTodolistTitleTC,
     createTodolistTC, deleteTodolistTC,
    FilterType, getTodolistsTC,
    TodolistType
} from "./state/todolists-reducer";
import {
     changeTaskStatusTC, changeTaskTitleTC, createTaskTC, deleteTaskTC,
    TasksStateType
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {useAppDispatch} from "./store/hooks";


function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
   // const dispatch = useDispatch()
    const dispatch = useAppDispatch()


    const deleteTask = useCallback((todolistID: string, taskID: string) => {dispatch(deleteTaskTC(todolistID, taskID))}, [])
    const addTask = useCallback((todolistID: string, taskTitle: string) => {
        dispatch(createTaskTC(todolistID, taskTitle))
    },[])

    const changeTaskStatus = useCallback((todolistID: string, taskID: string, newStatus: number) => {
        dispatch(changeTaskStatusTC(todolistID, taskID, newStatus))}, [])
    const changeTaskTitle = useCallback((todolistID: string, taskID: string, newTaskTitle: string) => {
        dispatch(changeTaskTitleTC(todolistID, taskID, newTaskTitle))
    }, [])

    const changeFilter = useCallback((todolistID: string, filterValue: FilterType) => {dispatch(changeTodoFilterAC(todolistID, filterValue))}, [])
    const deleteTodolist = useCallback((todolistID: string) => {dispatch(deleteTodolistTC(todolistID))}, [])
    const addTodolist = useCallback((todolistTitle: string) => {dispatch(createTodolistTC(todolistTitle))}, [])
    const changeTodolistTitle = useCallback((todolistID: string, newTodoTitle: string) => {dispatch(changeTodolistTitleTC(todolistID, newTodoTitle))}, [])


    useEffect(() => {
        dispatch(getTodolistsTC())
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
