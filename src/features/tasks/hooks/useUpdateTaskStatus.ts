import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTaskStatus } from "../api/taskApi";
import type { Task } from "../types/task.types";
import { taskQueryKeys } from "../api/taskQueryKeys";

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
      const queryKey = taskQueryKeys.byProject(projectId);

      await queryClient.cancelQueries({
        queryKey,
      });

      const previousTasks = queryClient.getQueryData<Task[]>(queryKey);

      queryClient.setQueryData<Task[]>(queryKey, (currentTasks) => {
        if (!currentTasks) return currentTasks;

        return currentTasks.map((task) =>
          task.id === taskId ? { ...task, status } : task,
        );
      });

      return { previousTasks, queryKey };
    },

    onError: (_error, _variables, context) => {
      if (!context) return;

      queryClient.setQueryData(context.queryKey, context.previousTasks);
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
      if (variables?.projectId) {
        queryClient.invalidateQueries({
          queryKey: taskQueryKeys.byProject(variables.projectId),
        });
      }
    },
  });
}

// Alias for backward compatibility
export const useUpdateTAskStatus = useUpdateTaskStatus;