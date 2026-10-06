// import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/taskApi";

import { taskQueryKeys } from "../api/taskQueryKeys";
import type { TaskFilters } from "../types/taskFilter.types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useTasks(
    projectId: string | undefined,
    searchTerm = "",
    filters?: TaskFilters, 
    page = 1,
) {
    return useQuery({
        queryKey: projectId 
        ? taskQueryKeys.byProject(projectId, searchTerm, filters, page)
        : taskQueryKeys.all,
        queryFn: ({ signal }) =>
        fetchTasks(projectId!, searchTerm , filters,page, 10, signal),
        enabled: Boolean(projectId),
        staleTime: 30_000,
        gcTime: 5*60*1000,
        placeholderData: keepPreviousData,
    })
}