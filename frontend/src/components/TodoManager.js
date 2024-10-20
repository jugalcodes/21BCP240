import React, { useState, useEffect } from 'react'
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa'
import { ToastContainer } from 'react-toastify';
import { createTodo, deleteTodo, getAllTodos, updateTodo } from '../api/api';
import { notify } from '../api/utils';
import "./TodoManager.css"

const TodoManager = () => {
    const [input, setInput] = useState('');
    const [todos, setTodos] = useState([]);
    const [copyTodos, setCopyTodos] = useState([]);
    const [updateTodos, setUpdateTodos] = useState(null);

    const handleTodo = () => {
        if (updateTodos && input) {
            const obj = {
                todoName: input,
                isDone: updateTodos.isDone,
                _id: updateTodos._id
            }
            handleUpdateItem(obj);
        }
        else if (updateTodos === null && input) {
            handleAddTodo();
        }
        setInput('')
    }

    useEffect(() => {
        if (updateTodos) {
            setInput(updateTodos.todoName)
        }
    }, [updateTodos])

    const handleAddTodo = async () => {
        const obj = {
            todoName: input,
            isDone: false
        }
        try {
            const { success, message } = await createTodo(obj);
            if (success) {
                notify(message, 'success')
            }
            else {
                notify("Failed to create Todo", 'error')
            }
            fetchAllTodos()
        } catch (error) {
            console.log(error)
        }
    }

    const fetchAllTodos = async () => {
        try {
            const { data } = await getAllTodos();
            setTodos(data);
            setCopyTodos(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllTodos()
    }, [])

    const handleDeleteTodo = async (id) => {
        try {
            const { success, message } = await deleteTodo(id);
            if (success) {
                notify(message, 'success')
            }
            else {
                notify("Failed to delete Todo", 'error')
            }
            fetchAllTodos()
        } catch (error) {
            console.log(error)
        }
    }

    const handleCheckTodo = async (item) => {
        const { _id, isDone, todoName } = item;
        const obj = {
            todoName,
            isDone: !isDone
        }
        try {
            const { success, message } = await updateTodo(_id, obj);
            if (success) {
                notify(message, 'success')
            }
            else {
                notify("Failed to update Todo", 'error')
            }
            fetchAllTodos()
        } catch (error) {
            console.log(error)
            notify('Failed to update Todo', 'error')
        }
    }

    const handleUpdateItem = async (item) => {
        const { _id, isDone, todoName } = item;
        const obj = {
            todoName,
            isDone: isDone
        }
        try {
            const { success, message } = await updateTodo(_id, obj);
            if (success) {
                notify(message, 'success')
            }
            else {
                notify("Failed to update Todo", 'error')
            }
            fetchAllTodos()
        } catch (error) {
            console.log(error)
            notify('Failed to update Todo', 'error')
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase(); 
        const oldTodos = [...copyTodos];
        const results = oldTodos.filter((item) => item.todoName.toLowerCase().includes(term));
        setTodos(results);
    }

    return (
        <div className='todo-manager'>
            <h1 className='todo-title'>Todo App</h1>

            <div className='input-container'>
                <div className='input-group'>
                    <input
                        type='text'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className='form-control'
                        placeholder='Add new Todo here'
                    />
                    <button
                        onClick={handleTodo}
                        className='btn btn-success'
                    >
                        <FaPlus />
                    </button>
                </div>

                <div className='input-group'>
                    <span className='input-group-text'>
                        <FaSearch />
                    </span>
                    <input
                        onChange={handleSearch}
                        type='text'
                        className='form-control'
                        placeholder='Search Todo'
                    />
                </div>
            </div>

            <div className='todo-list'>
                {todos.map((item) => (
                    <div key={item._id} className='todo-item'>
                        <span className={item.isDone ? 'done' : ''}>
                            {item.todoName}
                        </span>

                        <div className='todo-actions'>
                            <button
                                onClick={() => handleCheckTodo(item)}
                                className='btn btn-success'
                                type='button'>
                                <FaCheck />
                            </button>

                            <button
                                onClick={() => setUpdateTodos(item)}
                                className='btn btn-warning'
                                type='button'>
                                <FaPencilAlt />
                            </button>

                            <button
                                onClick={() => handleDeleteTodo(item._id)}
                                className='btn btn-danger'
                                type='button'>
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    )
}

export default TodoManager