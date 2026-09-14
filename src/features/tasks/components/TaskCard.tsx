import { Button, Card, CardContent, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import type { Task } from "../types/task.types";
import DeleteIcon from "@mui/icons-material/Delete" 
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

interface TaskCardProps {
    task: Task;
    onDelete:(taskId : string)=> void;
    onEdit:(teskId: string)=> void;
}

export default function TAskCard({task, onDelete, onEdit}: TaskCardProps){

    const [deleteDialogOpen, setDeleteDialogOpen]= useState(false);

    return(
        <Card>
            <CardContent>
                <Stack spacing={1.5}>
                    <Stack 
                    direction={`row`}
                    sx={{
                        justifyContent:"space-between",
                        alignItems:"flex-start"
                    }}
                    spacing={2}
                    >
                        <Typography variant="h6"> {task.title} </Typography>
                        <Stack 
                        direction={`row`}
                        spacing={1}
                        sx={{alignItems:"center"}}
                        >
                            <Chip
                            label={task.status}
                            size="small"
                            color={
                                task.status === "Completed" ? "success" : task.status === "In Progress" ? "primary" : "default"
                            }
                            />

                            <Tooltip title="Edit Task">
                                <IconButton
                                size="small"
                                onClick={()=>onEdit(task.id)}
                                aria-label={`Edit ${task.title}`}
                                >
                                    <EditIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete Task">
                                <IconButton
                                size="small"
                                color="error"
                                onClick={()=>setDeleteDialogOpen(true)}
                                aria-label={`Delete ${task.title}`}
                                >
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                        </Stack>

                        <Typography variant="body2" color="text.secondary">{task.description} </Typography>
                        <Stack
                        direction={{xs:"column", sm:"row"}}
                        spacing={2}
                        >
                            <Typography variant="body2">
                                {task.priority}
                            </Typography>
                            <Typography variant="body2">
                                {task.assignee}
                            </Typography>
                            <Typography variant="body2">
                                {task.dueDate}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
            <Dialog
            open={deleteDialogOpen}
            onClose={()=> setDeleteDialogOpen(false)}
            >
                <DialogTitle>Delete task?</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete "{task.title}"?
                    This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button
                    onClick={()=> setDeleteDialogOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                    onClick={()=>{
                        onDelete(task.id);
                        setDeleteDialogOpen(false);
                    }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}