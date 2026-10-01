import TaskColumn from "@/features/tasks/components/TaskColumn";
import { Box, Stack, Typography, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import type { Task } from "@/features/tasks/types/task.types";
import { useState } from "react";
import TaskDragPreview from "@/features/tasks/components/TaskDragPreview";
import TaskBulkActions from "@/features/tasks/components/TaskBulkActions";

import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useUpdateTaskStatus } from "@/features/tasks/hooks/useUpdateTaskStatus";

import { useDebounce } from "@/shared/hooks/useDebounce";


export default function ProjectBoardPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: serverTasks = [], isLoading, isError } = useTasks(projectId);
  const updateTaskStatus = useUpdateTaskStatus();

  const tasks = serverTasks;
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm ] = useState("");

  const debouncedSearchTerm = useDebounce(
    searchTerm,
    300
  );

  const filteredTasks = tasks.filter((task)=>{
    const search = debouncedSearchTerm.toLowerCase();

    return(
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search)
    )
  })

  const todoTasks = filteredTasks.filter((task) => task.status === "Todo");
  const inProgressTasks = filteredTasks.filter((task) => task.status === "In Progress");
  const completedTasks = filteredTasks.filter((task) => task.status === "Completed");

  if (isLoading) {
    return <Typography>Loading tasks...</Typography>;
  }

  if (isError) {
    return <Typography color="error">Failed to load tasks.</Typography>;
  }

  if (!projectId) {
    return <Typography>Project not found.</Typography>;
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTaskId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTaskId(null);
      return;
    }

    const taskId = String(active.id);
    const newStatus = String(over.id) as Task["status"];

    const currentTask = tasks.find((task) => task.id === taskId);
    if (currentTask && currentTask.status !== newStatus) {
      updateTaskStatus.mutate({
        taskId,
        status: newStatus,
        projectId,
      });
    }

    setActiveTaskId(null);
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography variant="h6">Board</Typography>
        <Typography variant="body2" color="text.secondary">
          Manage tasks using the Kanban board.
        </Typography>
        <TextField 
        fullWidth
        label="Search tasks"
        placeholder="Search by task title.."
        value={searchTerm}
        onChange={(event)=> setSearchTerm(event.target.value)}
        sx={{ mb: 2}}
        />
        <TaskBulkActions projectId={projectId} />
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{
          alignItems: "stretch",
        }}
      >
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ width: "100%" }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <TaskColumn title="Todo" tasks={todoTasks} />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <TaskColumn title="In Progress" tasks={inProgressTasks} />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <TaskColumn title="Completed" tasks={completedTasks} />
            </Box>
          </Stack>
          <DragOverlay>
            {activeTaskId
              ? (() => {
                  const activeTask = tasks.find(
                    (task) => task.id === activeTaskId,
                  );

                  return activeTask ? (
                    <TaskDragPreview task={activeTask} />
                  ) : null;
                })()
              : null}
          </DragOverlay>
        </DndContext>
      </Stack>
    </Stack>
  );
}

