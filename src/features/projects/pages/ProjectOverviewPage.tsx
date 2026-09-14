import { Button, ButtonGroup, Chip, Grid, Stack, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import ProjectSummaryCard from "../components/ProjecctSummaryCard";
import ProjectActivity from "../components/ProjectActivity";


export default function ProjectOverviewPage(){
    const { projectId } = useParams();

    const project = projects.find(
        (project)=> project.id === projectId
    )
    if(!project){
        return(
            <Typography variant="h4">Project not found.</Typography>
        )
    }
    return (
        <Stack spacing={3}>
            <Stack spacing={1}>
                <Typography variant="h4">
                     {project.name}
                </Typography>

                <Typography variant="body1" color="text.secondary">
                     {project.description}
                 </Typography>
                 <ButtonGroup variant="outlined">
                    <Button
                        component={Link}
                        to="board"
                    >
                        Board
                    </Button>

                    <Button
                        component={Link}
                        to="tasks"
                    >
                        Tasks
                    </Button>

                    <Button
                        component={Link}
                        to="members"
                    >
                        Members
                    </Button>
                </ButtonGroup>
             </Stack>
             <Stack direction={{xs:"column", sm:"row"}}
             spacing={3}
             >
                <Stack spacing={0.5}>
                    <Typography variant="caption" color="text.secondary">Status</Typography>
                    <Chip 
                    label={project.status}
                    size="small"
                    color={
                        project.status === "Completed" ? "success" : project.status === "In Progress" ? "primary" : "default"
                    }
                    />
                </Stack>
                <Grid container spacing={2}>
                    <Grid size={{xs:12, sm:6 }}>
                        <ProjectSummaryCard 
                        title="Tasks"
                        value={project.tasksCount}
                        description="Total tasks"
                        />
                    </Grid>
                    <Grid size={{xs:12, sm:6}}>
                        <ProjectSummaryCard 
                        title="Members"
                        value={project.membersCount}
                        description="Total members"
                        />
                    </Grid>
                </Grid>

                
                <Stack spacing={0.5}>
                    <Typography variant="caption" color="text.secondary">
                        Created
                    </Typography>

                    <Typography variant="body1">
                        {project.createdAt}
                    </Typography>
                </Stack>
                
            </Stack>
            <ProjectActivity />
        </Stack>
    )
}