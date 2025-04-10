import {Task} from './App.tsx';
import s from './PlannerItem.module.css'
import {Buttons} from './Buttons.tsx';

type Props = {
    title: string
    menu: Task[]
    date?: string
}

export const PlannerItem = ( {title, menu, date }: Props) => {


    return (
        <div className={s.card}>
            <h3>{title}</h3>
            <div>
                <input/>
                <Buttons title='+' />
            </div>
            {menu.length === 0 ? (
            <p>Menu empty</p>) : (
                <ul className={s.list}>
                {menu.map(m => {
                    return (
                        <li key={m.id} >
                            <input type="checkbox" checked={m.isDone}/>
                            <span>{m.title}</span>
                        </li>
                    )
                })}
            </ul>
                )}
            <div>
                <Buttons title='Total calories' />
                <Buttons title='Proteins' />
                <Buttons title='Fats' />
                <Buttons title='Carbs' />
            </div>
            <div>{date}</div>
        </div>
    );
};

