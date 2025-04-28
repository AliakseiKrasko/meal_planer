import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, Task } from '@/model/tasks-reducer.ts'
import { Grid, Paper } from '@mui/material'
import { TodolistItem } from '@/TodolistItem.tsx'
import { useAppSelector } from '@/app/common/hooks/useAppSelector.ts'
import { selectTodolists } from '@/model/todolists-selectors.ts'
import { selectTasks } from '@/model/tasks-selectors.ts'
import { useAppDispatch } from '@/app/common/hooks/useAppDispatch.ts'
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  deleteTodolistAC,
  FilterValues,
} from '@/model/todolist-reducers.ts'


const Todolists = () => {
  const todolist = useAppSelector(selectTodolists)
  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id: todolistId, filter }))
  }
  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistAC({ id: todolistId }))
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
    <div>
      {todolist.map(todolist => {
        const todolistTask = tasks[todolist.id]
        let filteredTasks = todolistTask
        if (todolist.filter === 'active') {
          filteredTasks = todolistTask.filter((task: Task) => !task.isDone)
        }
        if (todolist.filter === 'completed') {
          filteredTasks = todolistTask.filter((task: Task) => task.isDone)
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
    </div>
  )
}

export default Todolists