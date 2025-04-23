import {Todolist} from '../App.tsx';

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {

}

type Actions = {
    type: string
    payload: any
}