import './App.css'
import {PlannerItem} from './PlannerItem.tsx';
import { v4 as uuidv4 } from 'uuid';
import {useState} from 'react';

export type Menu = {
    id: string
    title: string
    isDone: boolean
}


export const App = () => {

    const [menuPlanner, setMenuPlanner] = useState<Menu[]> ([
        {id: uuidv4(), title: 'Apple', isDone: true},
        {id: uuidv4(), title: 'Pear', isDone: false},
        {id: uuidv4(), title: 'Plum', isDone: true},
        {id: uuidv4(), title: 'Banana', isDone: true},
        {id: uuidv4(), title: 'Orange', isDone: true}
    ])


    const data = new Date().toLocaleDateString()

    const deleteTask = (taskId: string) => {
        setMenuPlanner(prevMenu => prevMenu.filter(m => m.id !== taskId))
    }


    return (
        <div className="app" >
            <PlannerItem title='What to eat (morning)' menu={menuPlanner} date={data} deleteTask={deleteTask} />

        </div>
    )
}


