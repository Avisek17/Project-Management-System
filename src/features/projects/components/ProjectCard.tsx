import { Card, CardContent, Typography, Stack, Chip, IconButton, Tooltip, Dialog, Button, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import type { Project } from "../types/project.types";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

interface ProjectCardProps {
    project: Project;
    onDelete: (projectId : string) => void;
    onEdit:(projectId : string) => void;
}


export default function ProjectCard({ project, onDelete, onEdit }: ProjectCardProps){
    const [deleteDialogOpen, setDeleteDialogOpen]= useState(false);
    return(
        <Card >
            <CardContent>
                <Stack 
                spacing={2}>
                    <Stack
                    direction={`row`}
                    sx={{
                        justifyContent:"space-between",
                        alignItems:"flex-start",
                    }}
                    spacing={0.5}
                    >
                        <Typography variant="h6"
                        component={Link}
                        to={`/projects/${project.id}`}
                        >{project.name}</Typography>
                        <Chip 
                        label={project.status}
                        size="small"
                        color={
                            project.status === "Completed"
                            ? "success" : project.status === "In Progress"
                            ? "primary" : "default"
                        }
                        />
                        <Tooltip title="Edit Project">
                            <IconButton
                            size="small"
                            onClick={()=> onEdit(project.id)}
                            aria-label={`Edit ${project.name}`}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Project">
                            <IconButton
                            size="small"
                            color="error"
                            onClick={()=> setDeleteDialogOpen(true)}
                            aria-label={`Delete ${project.name}`}
                            >
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </Tooltip>

                    </Stack>
                    <Typography variant="body2" color="text.secondary"> {project.description} </Typography>
                    <Stack direction={`row`} spacing={3}>
                        <Typography variant="body2">{project.tasksCount} Tasks</Typography>
                        <Typography variant="body2"> {project.membersCount} Members</Typography>
                    </Stack>
                </Stack>
            </CardContent>
            <Dialog
            open={deleteDialogOpen}
            onClose={()=> setDeleteDialogOpen(false)}
            >
                <DialogTitle>Delete project?</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete "{project.name}"?
                    This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> setDeleteDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                    color="error"
                    variant="contained"
                    onClick={()=>{
                        onDelete(project.id);
                        setDeleteDialogOpen(false)
                    }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>

    )
}