import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";

const projects = [
     {
    name: "Project Management System",
    description: "Internal project and task management platform.",
    status: "In Progress",
  },
  {
    name: "E-commerce Platform",
    description: "Online store with product and order management.",
    status: "Completed",
  },
  {
    name: "Team Collaboration App",
    description: "Real-time collaboration for remote teams.",
    status: "In Progress",
  },
]

export default function RecentProjects(){
    return(
    <Stack spacing={2}>
        <Typography variant="h5">Recent Projects</Typography>
        {projects.map((project)=>(
            <Card key={project.name}>
                <CardContent>
                    <Stack
                    direction={`row`}
                    sx={{
                        justifyContent:"space-between",
                        alignItems:"flex-start"
                    }}
                    spacing={2}
                    >
                        <Stack spacing={1}>
                            <Typography variant="subtitle1">{project.name}</Typography>
                            <Typography variant="body2" color="text.secondary"> {project.description} </Typography>
                        </Stack>
                            <Chip
                            label={project.status}
                            size="small"
                            color={
                                project.status === "Completed" ? "success" : "primary"
                            }
                            >
                            </Chip>
                        
                    </Stack>
                </CardContent>
            </Card>
        ))}
    </Stack>
    )
}