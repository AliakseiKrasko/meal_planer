import {Todolist} from '../App.tsx';


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
        default:
            return state
    }
}

export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: {id}} as const
}
export const createTodolistAC = (id: string, title: string) => {
    return {type: 'create_todolist', payload: {id, title}} as const
}
export const changeTodolistTitleAC = (payload: { id: string, title: string }) => {
    return {type: 'change_todolist_title', payload}
}

export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type ChangeTodolistAction = ReturnType<typeof changeTodolistTitleAC>

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistAction

