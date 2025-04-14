import {FilterValue, Menu} from './App.tsx';
import s from './PlannerItem.module.css'
import {Buttons} from './Buttons.tsx';

type Props = {
    title: string
    menu: Menu[]
    date?: string
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValue) => void
    toggleTask: (taskId: string) => void
}

export const PlannerItem = ( {title, menu, date, deleteTask, toggleTask }: Props) => {

    const onChangeHadler = (taskId: string) => {
        toggleTask(taskId); // Вызываем функцию из пропсов
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

