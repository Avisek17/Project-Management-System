import type { RootState } from "@/app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectTasks = (state: RootState)=>
    state.tasks.items;

export const selectTodoTasks = ( state: RootState, projectId : string)=>
    state.tasks.items.filter(
        (task)=> 
            task.projectId === projectId &&
            task.status === "Todo"
    );

export const selectInProgressTasks = ( state : RootState, projectId: string)=>
    state.tasks.items.filter(
        (task)=> 
            task.projectId === projectId &&
            task.status === "In Progress"
    );

export const selectCompletedTasks = ( state : RootState, projectId: string)=>
    state.tasks.items.filter(
        (task)=>
            task.projectId === projectId &&
            task.status === "Completed"
    );


export const selectTaskById = ( state : RootState, taskId: string) =>
    state.tasks.items.find(
        (task)=> task.id === taskId
    );


    export const selectTaskCounts = createSelector(
        [selectTasks],
        (tasks) =>({
            total : tasks.length,
            todo: tasks.filter(
                (task)=> task.status === "Todo",
            ).length,
            inProgress: tasks.filter(
                (task)=> task.status === "In Progress",
            ).length,
            completed: tasks.filter(
                (task)=> task.status === "Completed"
            ).length
        })
    )