import { Card, CardContent,Typography,Stack } from "@mui/material";

import type { Task } from "../types/task.types";
import DraggableTask from "./DraggableTask";
import { useDroppable } from "@dnd-kit/core";

interface TaskColumnProps {
    tasks:Task[];
    title:string;
}

export default function TaskColumn({tasks, title}: TaskColumnProps){

    const { setNodeRef, isOver} = useDroppable({
        id: title
    })
    return(
        <Card
        ref={setNodeRef}
        sx={{
            height:"100%",
            transition:"background-color 0.2s",
            bgcolor: isOver ? "action.hover" : "background.paper"
        }}
        >
            <CardContent>
                <Stack spacing={2}>
                    <Stack 
                    direction={`row`}
                    sx={{
                        justifyContent:"space-between",
                        alignItems:"center"
                    }}
                    >
                        <Typography variant="h6">
                            {title}
                        </Typography>
                        <Typography variant="body2"
                        color="text.secondary"
                        >
                            {tasks.length}
                        </Typography>
                    </Stack>
                    <Stack spacing={2}>
                        {tasks.map((task)=>(
                        <DraggableTask 
                        key={task.id}
                        task={task}
                        />
                        ))}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}