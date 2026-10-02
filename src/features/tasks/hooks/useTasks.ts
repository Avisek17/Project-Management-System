import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/taskApi";

import { taskQueryKeys } from "../api/taskQueryKeys";


export function useTasks(projectId: string | undefined , searchTerm = "" ) {
    return useQuery({
        queryKey: projectId 
        ? taskQueryKeys.byProject(projectId, searchTerm)
        : taskQueryKeys.all,
        queryFn: ({ signal }) =>
        fetchTasks(projectId!, searchTerm , signal),
        enabled: Boolean(projectId),
        staleTime: 30_000,
        gcTime: 5*60*1000,
    })
}