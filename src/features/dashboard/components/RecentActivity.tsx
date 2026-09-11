import { Card, CardContent, Typography, Stack } from "@mui/material";

const activities = [
     {
    user: "Alex",
    action: "completed",
    target: "Authentication UI",
    time: "10 minutes ago",
  },
  {
    user: "Sarah",
    action: "created",
    target: "E-commerce Platform",
    time: "1 hour ago",
  },
  {
    user: "John",
    action: "joined",
    target: "Project Management System",
    time: "3 hours ago",
  },
  {
    user: "Alex",
    action: "created",
    target: "Dashboard",
    time: "Yesterday",
  },
]

export default function RectentActivity(){
    return(
        <Stack spacing={2}>
            <Typography variant="h5"> Recent Activity</Typography>
            <Card>
                <CardContent>
                    <Stack spacing={2}>
                        {activities.map((activity)=>(
                            <Stack
                            key={activity.user}
                            spacing={1}
                            >
                                <Typography variant="body2">
                                    <strong>{activity.user}</strong> {" "}
                                    {activity.action}{" "}
                                    <strong>{activity.target}</strong>{" "}
                                </Typography>

                                <Typography variant="caption"
                                color="text.secondary"
                                >
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