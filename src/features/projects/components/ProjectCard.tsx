import { Card, CardContent, Typography, Stack, Chip } from "@mui/material";
import type { Project } from "../types/project.types";


interface ProjectCardProps {
    project: Project;
}


export default function ProjectCard({ project }: ProjectCardProps){
    return(
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <Stack
                    direction={`row`}
                    sx={{
                        justifyContent:"space-between",
                        alignItems:"flex-start",
                    }}
                    spacing={2}
                    >
                        <Typography variant="h6">{project.name}</Typography>
                        <Chip 
                        label={project.status}
                        size="small"
                        color={
                            project.status === "Completed"
                            ? "success" : project.status === "In Progress"
                            ? "primary" : "default"
                        }
                        />
                    </Stack>
                    <Typography variant="body2" color="text.secondary"> {project.description} </Typography>
                    <Stack direction={`row`} spacing={3}>
                        <Typography variant="body2">{project.tasksCount} Tasks</Typography>
                        <Typography variant="body2"> {project.membersCount} Members</Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}