import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { tasks as initialTasks } from "../data/tasks";
import type { Task } from "../types/task.types";

interface TaskState {
    items : Task[];
    selectedTaskIds: string[];
}

const initialState : TaskState = {
    items: initialTasks,
    selectedTaskIds: [],
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
        },

        toggleTaskSelection: (
            state,
            action: PayloadAction<string>
        )=>{
            const taskId = action.payload;

            const isSelected = state.selectedTaskIds.includes(taskId);

            if(isSelected){
                state.selectedTaskIds = state.selectedTaskIds.filter(
                    (id) => id !== taskId,
                );
            } else{
                state.selectedTaskIds.push(taskId);
            }
        },

        clearTaskSelection: (state)=>{
            state.selectedTaskIds = [];
    },

    selectAllTasks : (state, action: PayloadAction<string>) => {
        const projectId = action.payload;

        state.selectedTaskIds = state.items.filter(
            (task)=> task.projectId === projectId
        ).map((task)=> task.id)
    },

    bulkUpdateStatus:(
        state,
        action: PayloadAction<{
            taskIds: string[];
            status: Task["status"];
        }>,
    ) => {
        state.items.forEach((task)=>{
            if(action.payload.taskIds.includes(task.id)){
                task.status = action.payload.status
            }
        });
    }
        }
    })


export const {
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    toggleTaskSelection,
    clearTaskSelection,
    selectAllTasks,
    bulkUpdateStatus,
} = taskSlice.actions;

export default taskSlice.reducer;