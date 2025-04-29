import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'
import { createTodolistAC } from '@/model/todolist-reducers.ts'
import { Grid } from '@mui/material'
import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm.tsx'
import Container from '@mui/material/Container'
import Todolists from '@/Todolists.tsx'


export const Main = () => {
  const dispatch = useAppDispatch()

  const CreateTodolist = (title: string) => {
    dispatch(createTodolistAC(title))
  }


  return (

    <Container maxWidth={'lg'}>
      <Grid container sx={{ mb: '30px' }}>
        <CreateItemForm onCreateItem={CreateTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}