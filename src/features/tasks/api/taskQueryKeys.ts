import type { TaskFilters } from "../types/taskFilter.types"

export const taskQueryKeys = {
    all: ["tasks"] as const,

    byProject:(
        projectId: string,
        searchTerm = "",
        filters?: TaskFilters,
    )=> 
    [
        "tasks",
        "project",
        projectId,
        {
            searchTerm,
            filters,
        }
    ] as const,
}