import { Container, Stack, Typography } from "@mui/material";
import ProjectList from "../components/ProjectList";
import { projects as initialProjects } from "../data/projects";
import { useState } from "react";
import type { Project } from "../types/project.types";
import type { CreateProjectFormData } from "../schemas/projectSchemas";
import CreateProjectForm from "../components/CreateProjectForm";

export default function ProjectPage(){
    const [projects, setProjects]= useState<Project[]>(initialProjects);

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
    return (
        <Container maxWidth="xl">
            <Stack spacing={2}>
                <Stack spacing={1}>
                    <Typography variant="h5">Projects</Typography>
                    <Typography variant="body1" color="text.secondary">Manage and track all your projects in one place.</Typography>
                </Stack>
                <CreateProjectForm onSubmitProject={handleCreateProject}/>
                <ProjectList projects={projects}/>
            </Stack>
        </Container>
    )
}