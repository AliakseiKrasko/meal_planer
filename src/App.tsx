import './App.css'
import {PlannerItem} from './PlannerItem.tsx';
import {v4 as uuidv4} from 'uuid';
import {useState} from 'react';

export type Menu = {
    id: string
    title: string
    filter: FilterValue
}

export type FilterValue = 'all' | 'active' | 'completed'


export const App = () => {

    const [menuPlanner, setMenuPlanner] = useState<Menu[]>([
        {id: uuidv4(), title: 'Apple', filter: 'all'},
        {id: uuidv4(), title: 'Pear', filter: 'all'},
        {id: uuidv4(), title: 'Plum', filter: 'all'},
        {id: uuidv4(), title: 'Banana', filter: 'all'},
        {id: uuidv4(), title: 'Orange', filter: 'all'}
    ])
    const [filter, setFilter] = useState<FilterValue>('all')

    let filteredPlanner = menuPlanner
    if(filter === 'active'){
        filteredPlanner = menuPlanner.filter(m => m.filter === 'active')
    }
    if(filter === 'completed')
        filteredPlanner = menuPlanner.filter(m => m.filter === 'completed')

    const changeFilter = (filter: FilterValue) => {
        setFilter(filter)
    }
    const data = new Date().toLocaleDateString()

    const deleteTask = (taskId: string) => {
        setMenuPlanner(prevMenu => prevMenu.filter(m => m.id !== taskId))
    }

    const toggleMenu = (id: string) => {
        setMenuPlanner(prevMenu => prevMenu.map(el =>
            el.id === id ? {...el, filter: el.filter === 'active' ? 'completed' : 'active'} : el))
    }
    const createMenu = (title: string) => {
        setMenuPlanner(prevMenu => [
            {
                id: uuidv4(),
                title: title,
                filter: 'all'
            },
            ...prevMenu
        ]);
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


