import { Todolist } from '../app/App.tsx'
import { createAction, nanoid } from '@reduxjs/toolkit'


const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case 'create_todolist': {
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case 'change_todolist_title': {
            return state.map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t)
        }
        case 'change_todolist_filter': {
            return state.map(todolist => todolist.id === action.payload.id ? {
                ...todolist,
                filter: action.payload.filter
            } : todolist)
        }
        default:
            return state
    }
}

export const deleteTodolistAC = createAction<{id: string}>('todolists/deleteTodolist')

export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {payload: {title, id: nanoid()}}
})
export const changeTodolistTitleAC = (payload: { id: string, title: string }) => {
    return {type: 'change_todolist_title', payload} as const
}
export const changeTodolistFilterAC = (payload: { id: string, filter: 'all' | 'active' | 'completed' }) => {
    return {type: 'change_todolist_filter', payload} as const
}


export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type ChangeTodolistAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAC = ReturnType<typeof changeTodolistFilterAC>

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistAction | ChangeTodolistFilterAC

