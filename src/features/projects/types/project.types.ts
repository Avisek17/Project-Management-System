export interface Project {
    id: string;
    name: string;
    description: string;
    status: "Planning" | "In Progress" | "Completed";
    membersCount: number;
    tasksCount: number;
    createdAt: string;
}