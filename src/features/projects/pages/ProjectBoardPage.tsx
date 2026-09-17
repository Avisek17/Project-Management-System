import TaskColumn from "@/features/tasks/components/TaskColumn";
// import { tasks as initialTasks } from "@/features/tasks/data/tasks";
import { Box, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { DndContext,DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import type { Task } from "@/features/tasks/types/task.types";
import { useState } from "react";
import TaskDragPreview from "@/features/tasks/components/TaskDragPreview";
// import { useTaskContext } from "@/features/tasks/context/TaskContext";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { moveTask } from "@/features/tasks/store/taskSlice";
import { selectTasks } from "@/features/tasks/store/taskSelectors";


export default function ProjectBoardPage(){
    const { projectId } = useParams();

    const tasks = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();

    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

    const projectTasks = tasks.filter(
        (task) => task.projectId === projectId,
    )

    const todoTasks = projectTasks.filter(
        (task)=> task.status === "Todo"
    )

    const inProgressTasks = projectTasks.filter(
        (task)=> task.status === "In Progress"
    )

    const completedTasks = projectTasks.filter(
        (task)=> task.status === "Completed"
    )

    const handleDragStart =(event: DragStartEvent)=>{
        setActiveTaskId(String(event.active.id))
    }

    const handleDragEnd = (event: DragEndEvent)=>{
        const { active, over } = event;

        if(!over) return;

        const taskId = String(active.id);
        const newStatus = String(over.id) as Task["status"];

        dispatch(moveTask({
            taskId,
            status: newStatus,
        }
        ))
        setActiveTaskId(null)
    }

    return (
        <Stack spacing={3}>
            <Stack spacing={0.5}>
                <Typography variant="h6">Board</Typography>
                <Typography variant="body2" color="text.secondary">
                    Manage tasks using the Kanban board.
                </Typography>
            </Stack>

            <Stack 
            direction={{ xs:"column", md:"row"}}
            spacing={2}
            sx={{
                alignItems:"stretch"
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
                        <TaskColumn
                        title="Todo"
                        tasks={todoTasks}
                        />
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <TaskColumn
                        title="In Progress"
                        tasks={inProgressTasks}
                        />
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <TaskColumn
                        title="Completed"
                        tasks={completedTasks}
                        />
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
    )
}