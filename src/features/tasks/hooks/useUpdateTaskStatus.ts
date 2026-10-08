import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTaskStatus } from "../api/taskApi";
import type { Task } from "../types/task.types";
import { taskQueryKeys } from "../api/taskQueryKeys";
import type { PaginatedTasks } from "../types/paginatedTasks.types";

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({
      taskId,
      status,
    }: {
      taskId: string;
      status: Task["status"];
      projectId: string;
    }) => updateTaskStatus(taskId, status),

    onMutate: async ({ taskId, status, projectId }) => {
      const projectQueryKey = taskQueryKeys.project(projectId);

      await queryClient.cancelQueries({
        queryKey: projectQueryKey,
      });

      const previousQueries =
        queryClient.getQueriesData<PaginatedTasks>({
          queryKey: projectQueryKey,
        });

queryClient.setQueriesData<PaginatedTasks>({
  queryKey:projectQueryKey
},
  (currentData)=> {
    if(!currentData) return currentData;

    return{
      ...currentData,
      items: currentData.items.map((task)=>
      task.id === taskId
    ? { ...task, status}: task)
    }
  }
  );
      return { previousQueries };
    },

    onError: (_error, _variables, context) => {
      if (!context) return;

      for(const[queryKey, previousData] of context.previousQueries){
        queryClient.setQueryData(queryKey, previousData)
      }
    },

    onSuccess: (updatedTask, variables) => {
      queryClient.setQueryData<Task[]>(
        taskQueryKeys.byProject(variables.projectId),
        (current) =>
          current?.map((task) =>
            task.id === updatedTask.id ? updatedTask : task,
          ) ?? [],
      );
    },

    onSettled: (_data, _error, variables) => {
      if (!variables?.projectId) return;
       
        queryClient.invalidateQueries({
          queryKey: taskQueryKeys.byProject(variables.projectId),
        });
    },
  });
}

// Alias for backward compatibility
export const useUpdateTAskStatus = useUpdateTaskStatus;
