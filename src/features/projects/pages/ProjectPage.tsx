import { Container, Stack, Typography, Dialog, DialogContent, DialogTitle } from "@mui/material";
import ProjectList from "../components/ProjectList";
import { projects as initialProjects } from "../data/projects";
import { useState } from "react";
import type { Project } from "../types/project.types";
import type { CreateProjectFormData } from "../schemas/projectSchemas";
import CreateProjectForm from "../components/CreateProjectForm";
import EditProjectForm from "../components/EditProjectForm";

export default function ProjectPage(){
    const [projects, setProjects]= useState<Project[]>(initialProjects);

    const [editingProjectId, setEditingProjectId]= useState<string | null>(null);

    const handleCreateProject = (data: CreateProjectFormData)=>{
        const newProject : Project = {
            id: crypto.randomUUID(),
            name: data.name,
            description: data.description,
            status:"Planning",
            membersCount: 0,
            tasksCount: 0,
            createdAt: new Date().toISOString(),
        }

        setProjects((currentProjects)=>[
            ...currentProjects,
            newProject
        ])
    }

    const handleDeleteProject = (projectId : string) => {
        setProjects((currentProject)=>
        currentProject.filter(
            (project) => project.id !== projectId,
        ))
    }

    const handleEditProject = (projectId : string) => {
        setEditingProjectId(projectId);
    }

    const editingProject = projects.find(
        (project) => project.id === editingProjectId,
    )

    const handleUpdateProject = ( data: CreateProjectFormData)=> {
        setProjects((currentProjects)=>
        currentProjects.map((project)=>
        project.id === editingProjectId ? {
            ...project,
            name: data.name,
            description: data.description,
        } : project,))
        setEditingProjectId(null);
    }
    return (
        <Container maxWidth="xl">
            <Stack spacing={2}>
                <Stack spacing={1}>
                    <Typography variant="h5">Projects</Typography>
                    <Typography variant="body1" color="text.secondary">Manage and track all your projects in one place.</Typography>
                </Stack>
                <CreateProjectForm onSubmitProject={handleCreateProject}/>

                <Dialog
                open={!!editingProject}
                onClose={()=> setEditingProjectId(null)}
                fullWidth
                maxWidth="sm"
                >
                    <DialogTitle>Edit Project</DialogTitle>
                    <DialogContent>
                        {editingProject && (
                            <Stack sx={{pt:1}}>
                                <EditProjectForm 
                                project={editingProject}
                                onSubmitProject={handleUpdateProject}
                                onCancel={()=> setEditingProjectId(null)}
                                />
                            </Stack>
                        )}
                    </DialogContent>
                </Dialog>

                <ProjectList 
                projects={projects}
                onDelete={handleDeleteProject}
                onEdit={handleEditProject}
                />
            </Stack>
        </Container>
    )
}