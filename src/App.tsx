import './App.css'
import {PlannerItem} from './PlannerItem.tsx';
import {v4 as uuidv4} from 'uuid';
import {useState} from 'react';

export type Menu = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValue = 'Total calories' | 'Proteins' | 'Fats' | 'Carbs'


export const App = () => {

    const [menuPlanner, setMenuPlanner] = useState<Menu[]>([
        {id: uuidv4(), title: 'Apple', isDone: true},
        {id: uuidv4(), title: 'Pear', isDone: false},
        {id: uuidv4(), title: 'Plum', isDone: true},
        {id: uuidv4(), title: 'Banana', isDone: true},
        {id: uuidv4(), title: 'Orange', isDone: true}
    ])
    const [filter, setFilter] = useState<FilterValue>('Total calories')

    const changeFilter = () => {
        setFilter(filter)
    }
    const data = new Date().toLocaleDateString()

    const deleteTask = (taskId: string) => {
        setMenuPlanner(prevMenu => prevMenu.filter(m => m.id !== taskId))
    }

    const toggleTask = (id: string) => {
        setMenuPlanner(prevMenu => prevMenu.map(el =>
            el.id === id ? {...el, isDone: !el.isDone} : el))
    }


    return (
        <div className="app">
            <PlannerItem title='What to eat (morning)'
                         menu={menuPlanner}
                         date={data}
                         deleteTask={deleteTask}
                         changeFilter={changeFilter}
                         toggleTask={toggleTask}
            />

        </div>
    )
}


