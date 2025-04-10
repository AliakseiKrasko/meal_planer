import {Task} from './App.tsx';

type Props = {
    title: string
    menu: Task[]
}

export const PlannerItem = ( {title }: Props) => {


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li>
                    <input type="checkbox" checked={true}/> <span>Apple</span>
                </li>
                <li>
                    <input type="checkbox" checked={true}/> <span>Pear</span>
                </li>
                <li>
                    <input type="checkbox" checked={false}/> <span>Plum</span>
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

