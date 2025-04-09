import './App.css'

function App() {
    return (
        <div className="app">
            <div>
                <h3>What to eat</h3>
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
        </div>
    )
}

export default App
