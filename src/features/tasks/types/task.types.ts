export interface Task {
    id: string;
    title: string;
    description: string;
    status: "Todo" | "In Progress" | "Completed";
    priority:"Low" | "Medium" | "High";
    projectId: string;
    assignee: string;
    dueDate: string;
    createdAt: string;
}