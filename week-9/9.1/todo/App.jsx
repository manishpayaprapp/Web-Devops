import React, { useState } from 'react';

export default function App() {
    const [todos, setTodos] = useState([]);

    function addTODO() {
        let newArray = [];
        for (let i = 0; i < todos.length; i++)
            newArray.push(todos[i]);

        newArray.push({
            title: document.getElementById("title").value,
            description: document.getElementById("dis").value,
            done: true
        });

        setTodos(newArray);
    }

    return (
        <div>
            <input id={"title"} type="text" />
            <input id={"dis"} type="text" />
            <br />
            <button id="btn" onClick={addTODO}>addTODO</button>

            {todos.map((todo) => (
                <Todo
                    title={todo.title}
                    description={todo.description}
                    done={todo.done}
                />
            ))}
        </div>
    );
}
function Todo(props) {
    return (
        <div>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    );
}