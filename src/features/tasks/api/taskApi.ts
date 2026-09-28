import { tasks } from "../data/tasks";
import type { Task } from "../types/task.types";

export async function fetchTasks(projectId: string) : Promise<Task[]> {
    await new Promise((resolve)=> setTimeout(resolve, 500));

    return tasks.filter(
        (task)=> task.projectId === projectId,
    )
}