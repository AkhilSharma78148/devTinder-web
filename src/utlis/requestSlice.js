import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequestConnections: (state, action) => action.payload,
        removeRequestConnections: (state, action) => {
          const newArray = state.filter((r) => r._id !== action.payload);
          return newArray;
        },
    }
});

export const { addRequestConnections, removeRequestConnections } = requestSlice.actions;
export default requestSlice.reducer;