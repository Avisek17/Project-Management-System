export const taskQueryKeys = {
    all: ["tasks"] as const,

    byProject:(projectId: string)=> 
    ["tasks", "project", projectId] as const,
}