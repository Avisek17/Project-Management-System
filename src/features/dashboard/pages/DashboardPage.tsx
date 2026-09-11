import { Container, Stack } from "@mui/material"
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
                <RecentProjects />
                <RectentActivity />
            </Stack>
        </Container>
    )
}