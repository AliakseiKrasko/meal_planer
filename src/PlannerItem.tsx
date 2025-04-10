import {Task} from './App.tsx';

type Props = {
    title: string
    menu: Task[]
}

export const PlannerItem = ( {title, menu }: Props) => {


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li>
                    <input type="checkbox" checked={menu[0].isDone}/> <span>Apple</span>

                </li>
                <li>
                    <input type="checkbox" checked={menu[1].isDone}/> <span>Pear</span>
                </li>
                <li>
                    <input type="checkbox" checked={menu[2].isDone}/> <span>Plum</span>
                </li>
            </ul>
            <div>
                <button>Total calories</button>
                <button>Proteins</button>
                <button>Fats</button>
                <button>Carbs</button>
            </div>
        </div>
    );
};

