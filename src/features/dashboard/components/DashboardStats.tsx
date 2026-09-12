import { Grid } from "@mui/material";
import StatCard from "./StatCard";

const stats = [
    {
        title: "Total projects",
        value: 12,
        description: "There are 12 projects all together"
    },
    {
        title:"Active Tasks",
        value: 10,
        description:"J lekhe ni vayo"
    },
    {
    title: "Completed Tasks",
    value: 124,
    description: "18 completed this week",
  },
  {
    title: "Team Members",
    value: 9,
    description: "2 joined this month",
  },
]

export default function DashboardStats(){
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