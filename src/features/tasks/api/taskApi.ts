import { tasks } from "../data/tasks";
import type { Task } from "../types/task.types";

export async function fetchTasks(projectId: string) : Promise<Task[]> {
    await new Promise((resolve)=> setTimeout(resolve, 500));

    return tasks.filter(
        (task)=> task.projectId === projectId,
    )
}

export async function updateTaskStatus(
    taskId: string,
    status: Task["status"],
) : Promise<Task>{
    await new Promise((resolve)=> setTimeout(resolve,500));

    const task = tasks.find((task)=> task.id === taskId);

    if(!task){
        throw new Error("Task not found.")
    }

    task.status = status;
    
    return task;
}