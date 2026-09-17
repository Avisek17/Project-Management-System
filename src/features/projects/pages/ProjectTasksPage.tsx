import CreateTaskForm from "@/features/tasks/components/CreateTaskForm";
import EditTaskForm from "@/features/tasks/components/EditTaskForm";
import TaskList from "@/features/tasks/components/TaskList";
import { useTaskContext } from "@/features/tasks/context/TaskContext";
// import { tasks as initialTasks} from "@/features/tasks/data/tasks";
import type { CreateTaskFormData } from "@/features/tasks/schemas/taskSchemas";
import type { Task } from "@/features/tasks/types/task.types";
import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ProjectTasksPage(){

    const { projectId } = useParams();
    const { tasks, createTask, updateTask, deleteTask } = useTaskContext();
    const[createDialogOpen, setCreateDialogOpen]= useState(false);
    const[editingTaskId, setEditingTaskId]= useState<string | null>(null);

    const editingTask = tasks.find(
        (task)=> task.id === editingTaskId,
    )

    const projectTasks = tasks.filter(
        (task)=> task.projectId === projectId,
    )

    const handleCreateTask = (data: CreateTaskFormData) => {
        if(!projectId) return;

        const newTask : Task ={
            id: crypto.randomUUID(),
            title:data.title,
            description: data.description,
            status:"Todo",
            priority:data.priority,
            projectId,
            assignee:data.assignee,
            dueDate:data.dueDate,
            createdAt: new Date().toISOString()
        }
        createTask(newTask)

        setCreateDialogOpen(false)
    }

    const handleDeleteTask = (taskId : string) => {
        deleteTask(taskId)
    }

    const handleEditTask = (taskId : string)=>{
        setEditingTaskId(taskId)
    }

    const handleUpdateTask = (data: CreateTaskFormData)=>{
        if(!editingTask) return;
        updateTask({
            ...editingTask,
            title:data.title,
            description:data.description,
            priority: data.priority,
            assignee:data.assignee,
            dueDate:data.dueDate
        
    })
    setEditingTaskId(null)
    }

    return (
        <Stack spacing={3}>
            <Stack direction={{xs:"column", sm:"row"}}
            sx={{
                justifyContent:"space-between",
                alignItems:"center"
            }}
            >
                <Stack
                spacing={0.5}
                >
                    <Typography variant="h6">Project Tasks</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage tasks for this project
                    </Typography>
                </Stack>

                <Button
                variant="contained"
                onClick={()=> setCreateDialogOpen(true)}
                >
                    Create Task
                </Button>
            </Stack>
            <TaskList 
            tasks={projectTasks}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            />
            <Dialog
            open={createDialogOpen}
            onClose={()=> setCreateDialogOpen(false)}
            fullWidth
            maxWidth="sm"
            >
                <DialogTitle>Create Task</DialogTitle>
                <DialogContent>
                    <Stack sx={{pt:1}}>
                        <CreateTaskForm 
                        onSubmit={handleCreateTask}
                        />
                    </Stack>
                </DialogContent>
            </Dialog>
            <Dialog
            open={!!editingTask}
            onClose={()=> setEditingTaskId(null)}
            fullWidth
            maxWidth="sm"
            >
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    {editingTask && (
                        <Stack sx={{pt:1}}>
                            <EditTaskForm 
                            task={editingTask}
                            onSubmitTask={handleUpdateTask}
                            onCancel={()=> setEditingTaskId(null)}
                            />
                        </Stack>
                    )}
                </DialogContent>
            </Dialog>
        </Stack>
    )
}