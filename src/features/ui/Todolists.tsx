import {useAppSelector} from '@/common/hooks/useAppSelector.ts'
import Paper from '@mui/material/Paper'
import { selectTodolists } from '@/features/model/todolists-selectors.ts'
import { Grid } from '@mui/material'
import { TodolistItem } from '@/features/ui/TodolistItem/TodolistItem.tsx'



export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  return (
    <>
      {todolists.map(todolist => (
        <Grid key={todolist.id}>
          <Paper sx={{p: '0 20px 20px 20px'}}>
            <TodolistItem todolist={todolist}/>
          </Paper>
        </Grid>
      ))}
    </>
  )
}