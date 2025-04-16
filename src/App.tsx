import './App.css'
import {PlannerItem} from './PlannerItem.tsx';
import {v4 as uuidv4} from 'uuid';
import {useState} from 'react';

export type Menu = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValue = 'all' | 'active' | 'completed'


export const App = () => {

    const [menuPlanner, setMenuPlanner] = useState<Menu[]>([
        {id: uuidv4(), title: 'Apple', isDone: true},
        {id: uuidv4(), title: 'Pear', isDone: false},
        {id: uuidv4(), title: 'Plum', isDone: true},
        {id: uuidv4(), title: 'Banana', isDone: true},
        {id: uuidv4(), title: 'Orange', isDone: true}
    ])
    const [filter, setFilter] = useState<FilterValue>('all')

    let filteredPlanner = menuPlanner
    if(filter === 'active'){
        filteredPlanner = menuPlanner.filter(m =>!m.isDone)
    }
    if(filter === 'completed')
        filteredPlanner = menuPlanner.filter(m => m.isDone)

    const changeFilter = (filter: FilterValue) => {
        setFilter(filter)
    }
    const data = new Date().toLocaleDateString()

    const deleteTask = (taskId: string) => {
        setMenuPlanner(prevMenu => prevMenu.filter(m => m.id !== taskId))
    }

    const toggleMenu = (id: string) => {
        setMenuPlanner(prevMenu => prevMenu.map(el =>
            el.id === id ? {...el, isDone: !el.isDone} : el))
    }
    const createMenu = (title: string) => {
        const newMenu = {
            id: uuidv4(),
            title: title,
            isDone: false
        }
        const newMenuPlanner = [newMenu, ...menuPlanner]
        setMenuPlanner(newMenuPlanner)

    }


    return (
        <div className="app">
            <PlannerItem title='What to eat (morning)'
                         menu={filteredPlanner}
                         date={data}
                         deleteTask={deleteTask}
                         changeFilter={changeFilter}
                         toggleMenu={toggleMenu}
                         createMenu={createMenu}
                         filter={filter}
            />

        </div>
    )
}


