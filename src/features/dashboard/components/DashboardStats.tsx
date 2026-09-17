import { Grid } from "@mui/material";
import StatCard from "./StatCard";

import { useAppSelector } from "@/app/store/hooks";
import { selectTaskCounts } from "@/features/tasks/store/taskSelectors";

export default function DashboardStats(){
    const taskCounts = useAppSelector(selectTaskCounts);

    const stats = [
    {
        title: "Total projects",
        value: 12,
        description: "There are 12 projects all together"
    },
    {
        title:"Active Tasks",
        value: taskCounts.inProgress,
        description:`${taskCounts.inProgress} tasks currently in progress`
    },
    {
    title: "Completed Tasks",
    value: taskCounts.completed,
    description: `${taskCounts.completed} completed tasks`,
  },
  {
    title: "Team Members",
    value: 9,
    description: "2 joined this month",
  },
]
    return(
        <Grid 
        container
        spacing={2}
        >
            {stats.map((stat)=>(
                <Grid key={stat.title} size={{xs:12, sm:6, lg:3}}>
                    <StatCard {...stat}/>
                </Grid>
            ))}

        </Grid>
    )
}