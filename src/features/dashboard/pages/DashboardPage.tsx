import { Container, Grid, Stack } from "@mui/material"
import DashboardHeader from "../components/DashboardHeader"
import DashboardStats from "../components/DashboardStats"

import RecentProjects from "../components/RecentProjects"
import RectentActivity from "../components/RecentActivity"

import { useAppSelector } from "@/app/store/hooks"
import { selectTaskCounts } from "@/features/tasks/store/taskSelectors"


export default function DashboardPage(){
    const taskCounts = useAppSelector(selectTaskCounts);
    
const stats = [
    {
      label: "Total Tasks",
      value: taskCounts.total,
    },
    {
      label: "Todo",
      value: taskCounts.todo,
    },
    {
      label: "In Progress",
      value: taskCounts.inProgress,
    },
    {
      label: "Completed",
      value: taskCounts.completed,
    },
  ];

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