import './App.css'
import {PlannerItem} from './PlannerItem.tsx';
import {v4 as uuidv4} from 'uuid';
import {useState} from 'react';

export type MenuGroup = {
    id: string
    title: string
    filter: FilterValue
    items: Menu[]
}

export type Menu = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValue = 'all' | 'active' | 'completed'


export const App = () => {

    const [menuGroups, setMenuGroups] = useState<MenuGroup[]>([
        {
            id: uuidv4(),
            title: 'Breakfast',
            filter: 'all',
            items: [
                {id: uuidv4(), title: 'Apple', isDone: true},
                {id: uuidv4(), title: 'Pear', isDone: false},
            ]
        },
        {
            id: uuidv4(),
            title: 'Lunch',
            filter: 'all',
            items: [
                {id: uuidv4(), title: 'Plum', isDone: true},
                {id: uuidv4(), title: 'Banana', isDone: true},
            ]
        },
        {
            id: uuidv4(),
            title: 'Dinner',
            filter: 'all',
            items: [
                {id: uuidv4(), title: 'Orange', isDone: true}
            ]
        }
    ])

    const data = new Date().toLocaleDateString()

    const toggleMenuItem = (groupId: string, itemId: string) => {
        setMenuGroups(prev => prev.map(group =>
            group.id === groupId
                ? {
                    ...group,
                    items: group.items.map(item =>
                        item.id === itemId ? {...item, isDone: !item.isDone} : item
                    )
                }
                : group
        ))
    }

    const addMenuItem = (groupId: string, title: string) => {
        setMenuGroups(prev => prev.map(group =>
            group.id === groupId
                ? {
                    ...group,
                    items: [
                        {id: uuidv4(), title, isDone: false},
                        ...group.items
                    ]
                }
                : group
        ))
    }

    const changeGroupFilter = (groupId: string, filter: FilterValue) => {
        setMenuGroups(prev => prev.map(group =>
            group.id === groupId ? {...group, filter} : group
        ))
    }
    const deleteTask = (groupId: string, itemId: string) => {
        setMenuGroups(prev => prev.map(group =>
            group.id === groupId
                ? {
                    ...group,
                    items: group.items.filter(item => item.id !== itemId)
                }
                : group
        ))
    }

    const deleteDayMenu = (id: string) => {
        setMenuGroups(prev => prev.filter(m => m.id !== id))
    }


    return (
        <div className="app">
            {menuGroups.map(group => (
                <PlannerItem
                    key={group.id}
                    groupId={group.id}
                    title={group.title}
                    menu={group.items.filter(item => {
                        if (group.filter === 'all') return true
                        if (group.filter === 'active') return !item.isDone
                        return item.isDone
                    })}
                    date={data}
                    deleteTask={(itemId) => deleteTask(group.id, itemId)}
                    changeFilter={(filter) => changeGroupFilter(group.id, filter)}
                    toggleMenu={(itemId) => toggleMenuItem(group.id, itemId)}
                    createMenu={(title) => addMenuItem(group.id, title)}
                    filter={group.filter}
                    deleteDayMenu={deleteDayMenu}
                />
            ))}
        </div>
    )
}


