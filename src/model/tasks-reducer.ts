import type {TasksState} from '../App'
import {CreateTodolistAction, DeleteTodolistAction} from './todolist-reducers.ts';

const initialState: TasksState = {}


export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'create_todolist': {
            return {...state, [action.payload.id]: []}
        }
        case 'delete_todolist': {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        case 'delete_task': {
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId) }
        }
        default:
            return state
    }
}

export const deleteTaskAC = (payload: {todolistId: string, taskId: string}) => {
    return {type: 'delete_task', payload} as const
}

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>


type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction