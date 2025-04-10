import './App.css'
import {PlannerItem} from './PlannerItem.tsx';

export type Task = {
    id: number
    title: string
    isDone: boolean
}


export const App = () => {
    const menu1: Task[] = [
        {id: 1, title: 'Apple', isDone: true},
        {id: 1, title: 'Pear', isDone: false},
        {id: 1, title: 'Plum', isDone: true},
        {id: 1, title: 'Banana', isDone: true},
        {id: 1, title: 'Orange', isDone: true}
    ]
    const menu2: Task[] = [
        {id: 1, title: 'Carrots', isDone: true},
        {id: 1, title: 'Cucumber', isDone: false},
        {id: 1, title: 'Tomato', isDone: true}
    ]
    const menu3: Task[] = [
        {id: 1, title: 'Eggs', isDone: true},
        {id: 1, title: 'Milk', isDone: false},
        {id: 1, title: 'Bread', isDone: true}
    ]

    const data = new Date().toLocaleDateString()


    return (
        <div className="app">
            <PlannerItem title='What to eat (morning)' menu={menu1} date={data} />
            <PlannerItem title='What to eat (lunch)' menu={menu2} />
            <PlannerItem title='What to eat (dinner)' menu={menu3} />
        </div>
    )
}


