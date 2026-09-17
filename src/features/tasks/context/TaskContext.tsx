import { createContext, useContext, useReducer } from "react";

import { tasks as initialTasks } from "../data/tasks";
import { taskReducer } from "./taskReducer"
import type { Task } from "../types/task.types";

interface TaskContextValue {
    tasks: Task[];
    createTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (taskId: string) => void;
    moveTask: (
        taskId: string,
        status: Task["status"],
        ) => void;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export function TaskProvider({children}:{
    children: React.ReactNode
}){
    const [ tasks, dispatch ] = useReducer(
        taskReducer,
        initialTasks
    )

    const createTask = (task : Task) =>{
        dispatch({
            type:"CREATE_TASK",
            task
        })
    }

    const updateTask = (task: Task)=>{
        dispatch({
            type:"UPDATE_TASK",
            task
        })
    }

    const deleteTask = (taskId: string) => {
        dispatch({
            type:"DELETE_TASK",
            taskId
        })
    }

    const moveTask = (taskId: string, status: Task["status"])=>{
        dispatch({
            type:"MOVE_TASK",
            taskId,
            status
        })
    }
    return(
        <TaskContext.Provider value={{ tasks,
            createTask,
            updateTask,
            deleteTask,
            moveTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}

export function useTaskContext(){
    const context = useContext(TaskContext);

    if(!context){
        throw new Error("useTaskContext must be used inside TaskProvider")
    }
    return context;
}