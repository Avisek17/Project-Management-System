import TaskColumn from "@/features/tasks/components/TaskColumn";
import { Box, Stack, Typography, TextField, Select, MenuItem, InputLabel, FormControl, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import type { Task } from "@/features/tasks/types/task.types";
import { useEffect, useRef, useState } from "react";
import TaskDragPreview from "@/features/tasks/components/TaskDragPreview";
import TaskBulkActions from "@/features/tasks/components/TaskBulkActions";

import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useUpdateTaskStatus } from "@/features/tasks/hooks/useUpdateTaskStatus";

import { useDebounce } from "@/shared/hooks/useDebounce";
import type { TaskFilters } from "@/features/tasks/types/taskFilter.types";
import { useTaskHistory } from "@/features/tasks/hooks/useTaskHistory";


export default function ProjectBoardPage() {
  const { projectId } = useParams<{ projectId: string }>();
  
  const { history, recordChange, undo, redo } = useTaskHistory();

  const updateTaskStatus = useUpdateTaskStatus();
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm ] = useState("");
    const [ page, setPage ] = useState(1);
    const [filters, setFilters] = useState<TaskFilters>({
        status:"All",
        priority:"All",
        assignee:"All",
        dueDate:"All"
    });
    const debouncedSearchTerm = useDebounce(
    searchTerm,
    300
  );
    const { data: serverTasks, isLoading , isError } = useTasks(projectId, debouncedSearchTerm, filters,page);
    const totalPages = serverTasks?.totalPages ?? 1 ;
  
  const isHistoryAction = useRef(false);
    const tasks = serverTasks?.items ?? [];
 
  useEffect(()=>{
    setPage(1);
    }, [debouncedSearchTerm, filters])

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
      },
    {
      onSuccess: () => {
        if(isHistoryAction.current){
          isHistoryAction.current = false;
          return;
        }
        recordChange({
          taskId,
          projectId,
          previousStatus: currentTask.status,
          nextStatus:newStatus,
        })
      }
    });
    }

    setActiveTaskId(null);
  };

  const handleClearFilters = () => {
    setFilters({
        status:"All",
        priority:"All",
        assignee:"All",
        dueDate:"All"
    })
    setSearchTerm("");
  }

  const handleUndo = () => {
    const currentChange = history.present;

    if(!currentChange){
      return;
    }
    isHistoryAction.current = true;

    updateTaskStatus.mutate({
      taskId: currentChange.taskId,
      status: currentChange.previousStatus,
      projectId: currentChange.projectId,
    })
    undo();
  }

  const handleRedo = () => {
    if(history.future.length === 0){
      return;
    }
    const nextChange = history.future[0];
    if(!nextChange){
      return;
    }
    isHistoryAction.current = true;

    updateTaskStatus.mutate({
      taskId: nextChange.taskId,
      status: nextChange.nextStatus,
      projectId: nextChange.projectId,
    })
    redo();
  }

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
        <Stack spacing={2}
        sx={{
            mb:2
        }}
        direction={{xs:"column", sm:"row"}}

        >
        <FormControl sx={{minWidth:120}}>
            <InputLabel>Status</InputLabel>
            <Select
            value={filters.status}
            label="Status"
            onChange={(event)=>{
                setFilters((current)=> ({
                    ...current,
                    status: event.target.value as TaskFilters["status"] | "All",
                }))
              setPage(1);  
            }}
            >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Todo">Todo</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
            </Select>
        </FormControl>
        <FormControl sx={{minWidth:120}}>
            <InputLabel>Priority</InputLabel>
            <Select
            value={filters.priority}
            label="Priority"
            onChange={(event)=>
                setFilters((current)=>({
                    ...current,
                    priority:event.target.value as Task["priority"],
                }))
            }
            >
               <MenuItem value="All">All</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem> 
            </Select>
        </FormControl>
        <FormControl sx={{minWidth:120}}>
            <InputLabel>Assignee</InputLabel>
            <Select
            value={filters.assignee}
            label="Assignee"
            onChange={(event)=>
                setFilters((current)=>({
                    ...current,
                    assignee:event.target.value,
                }))
            }
            >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Alex">Alex</MenuItem>
                <MenuItem value="Sarah">Sarah</MenuItem>
                <MenuItem value="John">John</MenuItem>
            </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
  <InputLabel>Due date</InputLabel>

  <Select
    value={filters.dueDate}
    label="Due date"
    onChange={(event) =>
      setFilters((current) => ({
        ...current,
        dueDate: event.target.value as TaskFilters["dueDate"],
      }))
    }
  >
    <MenuItem value="All">All dates</MenuItem>
    <MenuItem value="Overdue">Overdue</MenuItem>
    <MenuItem value="Upcoming">Upcoming</MenuItem>
  </Select>
</FormControl>
<Button 
variant="outlined"
onClick={handleClearFilters}
>
    CLear filters
</Button>
        </Stack>
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
      <Stack
      direction={`row`}
      spacing={2}
      sx={{
        justifyContent:"center",
        mt:3,
      }}
      > 
      <Button
      variant="outlined"
      disabled={page === 1}
      onClick={()=> setPage((current)=> current - 1)}
      >
        Previous
      </Button>
      <Typography>
        Page {page} of { totalPages }
      </Typography>
        <Button
        variant="outlined"
        disabled={page === totalPages }
        onClick={()=> setPage((current)=> current + 1)}
        >
            Next
        </Button>
      </Stack>
      <Stack
  direction="row"
  spacing={1}
  sx={{
    justifyContent:"flex-end", 
    mb: 2 }}
>
  <Button
    variant="outlined"
    onClick={handleUndo}
    disabled={!history.present || updateTaskStatus.isPending}
  >
    Undo
  </Button>

  <Button
    variant="outlined"
    onClick={handleRedo}
    disabled={
      history.future.length === 0 ||
      updateTaskStatus.isPending
    }
  >
    Redo
  </Button>
</Stack>
    </Stack>
  );
}

