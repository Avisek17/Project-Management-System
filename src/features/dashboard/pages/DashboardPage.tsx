import { Container, Grid, Stack } from "@mui/material"
import DashboardHeader from "../components/DashboardHeader"
import DashboardStats from "../components/DashboardStats"

import RecentProjects from "../components/RecentProjects"
import RectentActivity from "../components/RecentActivity"



export default function DashboardPage(){

    return (
        <Container maxWidth="xl">
            <Stack spacing={4}>
                <DashboardHeader />
                <DashboardStats />
                <Grid 
                container
                spacing={2}
                >
                    <Grid 
                    size={{xs:12, lg:6.5}}
                    >
                        <RecentProjects />
                    </Grid>
                    <Grid 
                    size={{xs:12, lg:5.5}}
                    >
                        <RectentActivity />
                        
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    )
}