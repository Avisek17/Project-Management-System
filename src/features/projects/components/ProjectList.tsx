import { Grid } from "@mui/material";
// import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import type { Project } from "../types/project.types";

interface ProjectListProps {
    projects: Project[];
}

export default function ProjectList({projects}: ProjectListProps){
    return(
        <Grid 
        container
        spacing={2}
        >
            {projects.map((project)=>(
                <Grid key={project.name} size={{xs:12, sm:6, lg:4}}>
                <ProjectCard project={project} />
                
                </Grid>
            ))}
        </Grid>
    )
}