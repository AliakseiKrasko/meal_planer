import {useAppDispatch} from '@/common/hooks/useAppDispatch'
import {FilterButtons} from './FilterButtons/FilterButtons'
import {Tasks} from './Tasks/Tasks'
import {TodolistTitle} from './TodolistTitle/TodolistTitle'
import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm'
import { Todolist } from '@/features/model/todolist-reducers.ts'
import { createTaskAC } from '@/features/model/tasks-reducer.ts'

type Props = {
  todolist: Todolist
}

export const TodolistItem = ({todolist}: Props) => {
  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    dispatch(createTaskAC({todolistId: todolist.id, title}))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist}/>
      <CreateItemForm onCreateItem={createTask}/>
      <Tasks todolist={todolist}/>
      <FilterButtons todolist={todolist}/>
    </div>
  )
}
