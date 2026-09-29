import { useMutation } from "@tanstack/react-query";

import { updateTaskStatus } from "../api/taskApi";
import type { Task } from "../types/task.types";

export function useUpdateTAskStatus(){
    return useMutation({
        mutationFn:({
            taskId,
            status,
        }: {
            taskId : string;
            status: Task["status"];
        }) => updateTaskStatus(taskId, status)
    })
}