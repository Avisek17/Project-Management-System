import type { TaskFilters } from "../types/taskFilter.types"

export const taskQueryKeys = {
    all: ["tasks"] as const,

    project: (projectId : string) => 
    ["tasks","project", projectId] as const,
    
    byProject:(
        projectId: string,
        searchTerm = "",
        filters?: TaskFilters,
        page = 1,
    )=> 
    [
        "tasks",
        "project",
        projectId,
        {
            searchTerm,
            filters,
            page
        }
    ] as const,
}