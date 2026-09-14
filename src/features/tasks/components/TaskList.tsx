import { Grid } from "@mui/material";
import type { Task } from "../types/task.types";
import TAskCard from "./TaskCard";

interface TaskListProps {
    tasks: Task[];
    onDelete:(taskId: string)=> void;
    onEdit:(taskId: string)=> void;
}

export default function TaskList({tasks, onDelete, onEdit}: TaskListProps){
    return(
        <Grid container
        spacing={2}>
            {tasks.map((task)=>(
                <Grid key={task.title}
                size={{xs:12, md:6}}
                >
                    <TAskCard 
                    task={task}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    />
                </Grid>
            ))}
        </Grid>
    )
}