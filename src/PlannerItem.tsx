import {Task} from './App.tsx';
import s from './PlannerItem.module.css'

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
                <button>+</button>
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
                <button>Total calories</button>
                <button>Proteins</button>
                <button>Fats</button>
                <button>Carbs</button>
            </div>
            <div>{date}</div>
        </div>
    );
};

