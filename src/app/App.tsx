import './App.css'
import { useState } from 'react'
import { v1 } from 'uuid'
import { TodolistItem } from '../TodolistItem.tsx'
import { CreateItemForm } from '../CreateItemForm.tsx'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import { Grid, Paper } from '@mui/material'
import { containerSx } from '../TodolistItem.styles.ts'
import { NavButton } from '../NavButton.ts'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
} from '../model/todolist-reducers.ts'
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC } from '../model/tasks-reducer.ts'
import { useAppDispatch } from './common/hooks/useAppDispatch.ts'
import { useAppSelector } from './common/hooks/useAppSelector.ts'
import { selectTodolists } from '../model/todolists-selectors.ts'
import { selectTasks } from '../model/tasks-selectors.ts'

type ThemeMode = 'dark' | 'light'
export type TasksState = Record<string, Task[]>

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

  const todolist = useAppSelector(selectTodolists)
  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()


  /*const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])
  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {})*/

  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#087EA4',
      },
    },
  })

  const deleteTask = (todolistId: string, taskId: string) => {
    dispatch(deleteTaskAC({ todolistId, taskId }))
  }

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id: todolistId, filter }))
  }


  const createTask = (todolistId: string, title: string) => {
    dispatch(createTaskAC({ todolistId, title }))
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    dispatch(changeTaskStatusAC({ todolistId, taskId, isDone }))
  }
  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistAC({ id: todolistId }))
  }
  const CreateTodolist = (title: string) => {
    const id = v1()
    dispatch(createTodolistAC(id, title))
  }
  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId, title }))
  }
  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatch(changeTodolistTitleAC({ id: todolistId, title }))
  }
  const changeMode = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={{ mb: '30px' }}>
          <Toolbar>
            <Container maxWidth={'lg'} sx={containerSx}>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <div>
                <NavButton>Sign in</NavButton>
                <NavButton>Sign up</NavButton>
                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                <Switch color={'default'} onChange={changeMode} />
              </div>
            </Container>
          </Toolbar>
        </AppBar>
        <Container maxWidth={'lg'}>
          <Grid container sx={{ mb: '30px' }}>
            <CreateItemForm onCreateItem={CreateTodolist} />
          </Grid>
          <Grid container spacing={4}>
            {todolist.map(todolist => {
              const todolistTask = tasks[todolist.id]
              let filteredTasks = todolistTask
              if (todolist.filter === 'active') {
                filteredTasks = todolistTask.filter(task => !task.isDone)
              }
              if (todolist.filter === 'completed') {
                filteredTasks = todolistTask.filter(task => task.isDone)
              }
              return (
                <Grid key={todolist.id}>
                  <Paper sx={{ p: '0 20px 20px 20px' }}>
                    <TodolistItem key={todolist.id}
                                  todolist={todolist}
                                  tasks={filteredTasks}
                                  deleteTask={deleteTask}
                                  changeFilter={changeFilter}
                                  createTask={createTask}
                                  changeTaskStatus={changeTaskStatus}
                                  deleteTodolist={deleteTodolist}
                                  changeTaskTitle={changeTaskTitle}
                                  changeTodolistTitle={changeTodolistTitle}
                    />
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  )
}
