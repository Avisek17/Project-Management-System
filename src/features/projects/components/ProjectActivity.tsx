import { Card, CardContent, Stack, Typography } from "@mui/material";

const activities = [
    {
    user: "Alex",
    action: "completed a task",
    time: "10 minutes ago",
  },
  {
    user: "Sarah",
    action: "updated the project",
    time: "1 hour ago",
  },
  {
    user: "John",
    action: "joined the project",
    time: "3 hours ago",
  },
]

export default function ProjecctActivity(){
    return(
        <Stack spacing={2}>
            <Typography variant="h6"> Recent Activity</Typography>
            <Card>
                <CardContent>
                    <Stack spacing={2}>
                        {activities.map((activity)=>(
                            <Stack key={activity.user} spacing={0.5}>
                                <Typography variant="body2">
                                    <strong>{activity.user}</strong>{" "}
                                    {activity.action}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {activity.time}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    )
}