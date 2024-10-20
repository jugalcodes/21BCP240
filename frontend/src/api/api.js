// In this we are justing writing logic related to API that is whatever data is coming from API 
// is traversed from here

import { API_URL } from './utils'
export const createTodo = async (todoObj) => {
    const url = `${API_URL}/todos`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoObj)
    };
    try {
        const result = await fetch(url, options)
        const data = await result.json();
        return data;
    } catch (error) {
        return error;
    }
}

export const getAllTodos = async () => {
    const url = `${API_URL}/todos`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    try {
        const result = await fetch(url, options)
        const data = await result.json();
        return data;
    } catch (error) {
        return error;
    }
}

export const deleteTodo = async (id) => {
    const url = `${API_URL}/todos/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    try {
        const result = await fetch(url, options)
        const data = await result.json();
        return data;
    } catch (error) {
        return error;
    }
}

export const updateTodo = async (id, reqBody) => {
    const url = `${API_URL}/todos/${id}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    };
    try {
        const result = await fetch(url, options)
        const data = await result.json();
        return data;
    } catch (error) {
        return error;
    }
}

