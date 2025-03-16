import React, { useState } from 'react';
import './TodoApp.css'; // Importing a CSS file for additional styling

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState('');

    const addTodo = () => {
        if (input.trim()) {
            setTodos([...todos, input]);
            setInput('');
        }
    };

    const startEditing = (index) => {
        setEditingIndex(index);
        setEditingText(todos[index]);
    };

    const saveEdit = () => {
        const updatedTodos = todos.map((todo, index) =>
            index === editingIndex ? editingText : todo
        );
        setTodos(updatedTodos);
        setEditingIndex(null);
        setEditingText('');
    };

    const removeTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    return (
        <div className="container">
            <h1 className="title">To-Do List</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add a new task"
                    className="input"
                />
                <button onClick={addTodo} className="button">Add</button>
            </div>
            <ul className="list">
                {todos.map((todo, index) => (
                    <li key={index} className="list-item">
                        {editingIndex === index ? (
                            <div className="edit-container">
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    className="edit-input"
                                />
                                <button onClick={saveEdit} className="save-button">Save</button>
                            </div>
                        ) : (
                            <>
                                <span className="todo-text">{index + 1}. {todo}</span>
                                <div className="buttons">
                                    <button onClick={() => startEditing(index)} className="edit-button">Edit</button>
                                    <button onClick={() => removeTodo(index)} className="remove-button">Remove</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;