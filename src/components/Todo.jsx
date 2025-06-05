import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../utlis/todoSlice';

const Todo = () => {
    const dispatch = useDispatch();
    const todos = useSelector((store) => store.todos);

    const fetchTodos = async () => {
        if(todos) return;
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
            dispatch(addTodo(response.data)); 
        } catch (err) {
            console.log(err);
        }
    };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="text-center my-10">
        <h1 className="text-bold text-5xl">Todos</h1>
      <ul>
        {todos?.map((todo) => {
          const { id, title, completed } = todo;
          return (
            <li key={id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto card-title">
              {title} - {completed ? 'Yes' : 'No'}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
