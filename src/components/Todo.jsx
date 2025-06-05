import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../utlis/todoSlice';

const CHUNK_SIZE = 5;

const Todo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((store) => store.todos) || [];

  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      dispatch(addTodo(response.data)); 
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + CHUNK_SIZE);
  };

  return (
    <div className="text-center my-10">
        <h1 className="text-bold text-5xl">Todos</h1>
      <ul>
        {todos.slice(0, visibleCount).map((todo) => (
          <li className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto" key={todo.id}>
            {todo.title} - {todo.completed ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
      {visibleCount < todos.length && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default Todo;
