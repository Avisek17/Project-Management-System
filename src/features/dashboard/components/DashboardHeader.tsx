import { Stack, Typography } from "@mui/material";

export default function DashboardHeader(){
    return(
        <Stack spacing={1}>
            <Typography variant="h4">Dashboard</Typography>

            <Typography variant="body1"
            color="text.secondary"
            >
                Here's an overview of your projects and tasks.
            </Typography>
        </Stack>
    )
}