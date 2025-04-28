import './App.css'
import { TodolistItem } from '@/TodolistItem.tsx'
import { CreateItemForm } from '@/CreateItemForm.tsx'
import Container from '@mui/material/Container'
import { Grid, Paper } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
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
import { selectThemeMode } from './app-selectors.ts'
import { getTheme } from './common/theme/theme.ts'
import { Header } from '@/app/common/components/Header/Header.tsx'


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

export type TasksState = Record<string, Task[]>


export const App = () => {

  const todolist = useAppSelector(selectTodolists)
  const tasks = useAppSelector(selectTasks)
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  const dispatch = useAppDispatch()



  const changeFilter = (todolistId: string, filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id: todolistId, filter }))
  }
    const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistAC({ id: todolistId }))
  }
  const CreateTodolist = (title: string) => {
    dispatch(createTodolistAC(title))
  }
  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatch(changeTodolistTitleAC({ id: todolistId, title }))
  }


  const deleteTask = (todolistId: string, taskId: string) => {
    dispatch(deleteTaskAC({ todolistId, taskId }))
  }
  const createTask = (todolistId: string, title: string) => {
    dispatch(createTaskAC({ todolistId, title }))
  }
  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    dispatch(changeTaskStatusAC({ todolistId, taskId, isDone }))
  }
  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId, title }))
  }


  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
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
