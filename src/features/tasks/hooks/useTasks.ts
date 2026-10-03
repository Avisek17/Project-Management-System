import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/taskApi";

import { taskQueryKeys } from "../api/taskQueryKeys";
import type { TaskFilters } from "../types/taskFilter.types";


export function useTasks(
    projectId: string | undefined,
    searchTerm = "",
    filters?: TaskFilters
) {
    return useQuery({
        queryKey: projectId 
        ? taskQueryKeys.byProject(projectId, searchTerm, filters)
        : taskQueryKeys.all,
        queryFn: ({ signal }) =>
        fetchTasks(projectId!, searchTerm , filters, signal),
        enabled: Boolean(projectId),
        staleTime: 30_000,
        gcTime: 5*60*1000,
    })
}