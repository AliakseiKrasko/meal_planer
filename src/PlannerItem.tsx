import {FilterValue, Menu} from './App.tsx';
import s from './PlannerItem.module.css'
import {Buttons} from './Buttons.tsx';
import {ChangeEvent, useState} from 'react';


type Props = {
    groupId: string
    title: string
    menu: Menu[]
    date?: string
    deleteTask: (itemId: string) => void
    changeFilter: (filter: FilterValue) => void
    toggleMenu: (itemId: string) => void
    createMenu: (title: string) => void
    filter: FilterValue
    deleteDayMenu: (id: string) => void
}

export const PlannerItem = ({ groupId, deleteDayMenu, filter, title, menu, date, deleteTask, toggleMenu, changeFilter, createMenu}: Props) => {

    const [menuTitle, setMenuTitle] = useState('')
    const [error, setError] = useState("")

    const onChangeHandler = (taskId: string) => {
        toggleMenu(taskId); // Вызываем функцию из пропсов
    };
    const createMenuHandler = () => {
        if (menuTitle.trim() === "") {
            setError("Title is required")
            return
        }
        setError("")
        createMenu(menuTitle.trim())
        setMenuTitle('')
    }
    const changeMenuTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setMenuTitle(event.currentTarget.value)
        setError('')
    }
    const createMenuOnEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createMenuHandler()
        }
    }
    const deleteMenuHandler = () => {
        deleteDayMenu(groupId)
    }


    return (
        <div className={s.card}>
            <div className={s.container}>
                {title}
                <Buttons title={'х'} onClick={deleteMenuHandler} />
            </div>

            <div>
                {error && <div className={s.errorMessage}>{error}</div>}
                <input value={menuTitle}
                       onChange={changeMenuTitleHandler}
                       onKeyDown={createMenuOnEnterHandler}
                       className={error ? s.error : ''}
                />

                <Buttons title={'+'} onClick={createMenuHandler}/>
            </div>
            {menu.length === 0 ? (
                <p>Menu empty</p>) : (
                <ul className={s.list}>
                    {menu.map(m => {
                        return (
                            <li key={m.id} className={m.isDone ? s.isDOneStyle : ''}>
                                <input type="checkbox" checked={m.isDone} onChange={() => onChangeHandler(m.id)}/>
                                <span>{m.title}</span>
                                <Buttons title={'х'} onClick={() => deleteTask(m.id)}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div className="filterButton">
                <Buttons className={filter === 'all' ? s.activeFilter : ''} title='all' onClick={() => changeFilter('all')}/>
                <Buttons className={filter === 'active' ? s.activeFilter : s.filterButton} title='active' onClick={() => changeFilter('active')} />
                <Buttons className={filter === 'completed' ? s.activeFilter : s.filterButton} title='completed' onClick={() => changeFilter('completed')} />
            </div>
            <div>{date}</div>
        </div>
    );
};

