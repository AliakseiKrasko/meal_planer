import {FilterValue, Menu} from './App.tsx';
import s from './PlannerItem.module.css'
import {Buttons} from './Buttons.tsx';

type Props = {
    title: string
    menu: Menu[]
    date?: string
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValue) => void
    toggleMenu: (taskId: string) => void
}

export const PlannerItem = ( {title, menu, date, deleteTask, toggleMenu }: Props) => {

    const onChangeHadler = (taskId: string) => {
        toggleMenu(taskId); // Вызываем функцию из пропсов
    };

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
                            <input type="checkbox" checked={m.isDone} onChange={() => onChangeHadler(m.id)}/>
                            <span>{m.title}</span>
                            <Buttons title={'х'} onClick={() => deleteTask(m.id)} />
                        </li>
                    )
                })}
            </ul>
                )}
            <div className="filterButton">
                <Buttons title='all' />
                <Buttons title='active' className={s.filterButton} />
                <Buttons title='completed' className={s.filterButton} />
            </div>
            <div>{date}</div>
        </div>
    );
};

