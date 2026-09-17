import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { tasks as initialTasks } from "../data/tasks";
import type { Task } from "../types/task.types";

interface TaskState {
    items : Task[];
}

const initialState : TaskState = {
    items: initialTasks,
}

const taskSlice = createSlice({
    name:"tasks",
    initialState,
    reducers:{
        createTask:(state, action: PayloadAction<Task>)=>{
            state.items.push(action.payload);
            },

        updateTask:(state, action: PayloadAction<Task>)=>{
            const index = state.items.findIndex(
                (task)=> task.id === action.payload.id,
            );
            if(index !== -1){
                state.items[index] = action.payload;
            }
        },

        deleteTask:(state, action: PayloadAction<string>)=>{
            state.items = state.items.filter(
                (task)=> task.id !== action.payload,
            )
        },

        moveTask:(state, action: PayloadAction<{
            taskId: string,
            status: Task["status"];
        }>) => {
            const task = state.items.find(
                (task)=> task.id === action.payload.taskId,
            );
            if(task){
                task.status = action.payload.status;
            }
        }

    }
})

export const {
    createTask,
    updateTask,
    deleteTask,
    moveTask
} = taskSlice.actions;

export default taskSlice.reducer;