import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: null,
    reducers: {
        addTodo: (state, action) => {
            return action.payload;
        },
        removeTodo: (state, action) => {
            return null;
        },
    },
});

export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;