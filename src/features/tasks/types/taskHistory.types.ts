import type { Task } from "./task.types";

export interface TaskStatusChange {
    taskId: string;
    projectId: string;
    previousStatus: Task["status"];
    nextStatus: Task["status"];
}