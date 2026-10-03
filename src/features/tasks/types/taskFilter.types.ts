import type { Task } from "./task.types";

export interface TaskFilters {
    status: Task["status"] | "All";
    priority:Task["priority"] | "All";
    assignee: string;
    dueDate: "All" | "Overdue" | "Upcoming";
}