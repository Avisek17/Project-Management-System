import type { Task } from "./task.types";

export interface PaginatedTasks {
    items: Task[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}