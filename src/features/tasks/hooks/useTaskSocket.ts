
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "@/shared/api/socket";
import { taskQueryKeys } from "../api/taskQueryKeys";
import type { PaginatedTasks } from "../types/paginatedTasks.types";
import type { Task } from "../types/task.types";

interface TaskUpdatedPayload {
  taskId: string;
  projectId: string;
  status: Task["status"];
}

export function useTaskSocket(projectId: string | undefined) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!projectId) return;

    const handleTaskUpdated = (payload: TaskUpdatedPayload) => {
      if (payload.projectId !== projectId) return;

      queryClient.setQueriesData<PaginatedTasks>(
        {
          queryKey: taskQueryKeys.project(projectId),
        },
        (currentData) => {
          if (!currentData) return currentData;

          return {
            ...currentData,
            items: currentData.items.map((task) =>
              task.id === payload.taskId
                ? { ...task, status: payload.status }
                : task,
            ),
          };
        },
      );
    };

    socket.on("task:updated", handleTaskUpdated);

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off("task:updated", handleTaskUpdated);
    };
  }, [projectId, queryClient]);
}