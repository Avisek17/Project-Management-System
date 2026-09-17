import { Card, CardContent, Typography } from "@mui/material";

import type { Task } from "../types/task.types";

interface TaskDragPreviewProps {
    task: Task;
}

export default function TaskDragPreview({task}: TaskDragPreviewProps){
    return(
        <Card
        variant="outlined"
        sx={{
            cursor: "grabbing",
            boxShadow: 4,
        }}
        >
            <CardContent>
                <Typography variant="subtitle1">
                    {task.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {task.description}
                </Typography>
            </CardContent>
        </Card>
    )
}