export const taskQueryKeys = {
    all: ["tasks"] as const,

    byProject:(projectId: string,  searchTerm = "" )=> 
    ["tasks", "project", projectId, searchTerm] as const,
}