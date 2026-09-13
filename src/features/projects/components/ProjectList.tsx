import { Grid } from "@mui/material";
// import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import type { Project } from "../types/project.types";

interface ProjectListProps {
    projects: Project[];
    onDelete:(projectId : string)=> void;
    onEdit: (projectId: string)=> void;
}

export default function ProjectList({projects, onDelete, onEdit}: ProjectListProps){
    return(
        <Grid 
        container
        spacing={2}
        >
            {projects.map((project)=>(
                <Grid key={project.name} size={{xs:12, sm:6, lg:4}}>
                <ProjectCard 
                project={project}
                onDelete={onDelete}
                onEdit={onEdit}
                 />
                
                </Grid>
            ))}
        </Grid>
    )
}