import { useDraggable } from "@dnd-kit/core"
import { Card, CardContent, Typography } from "@mui/material"

import type { Task } from "../types/task.types"

interface DraggableTaskProps {
    task : Task;
}

export default function DraggableTask({task}: DraggableTaskProps){
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id:task.id,
    })

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        
    } : undefined;
    return(
        <Card
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        variant="outlined"
        sx={{
            cursor:"grab",
            position:"relative",
            "&:active":{
                cursor:"grabbing"
            }
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