import { useDraggable } from "@dnd-kit/core"
import { Card, CardContent, Typography } from "@mui/material"

import type { Task } from "../types/task.types"

import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import { selectSelectedTaskIds } from "../store/taskSelectors"
import { toggleTaskSelection } from "../store/taskSlice"
import Checkbox from "@mui/material/Checkbox"

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

    const dispatch = useAppDispatch();

    const selectedTaskIds = useAppSelector(selectSelectedTaskIds);

    const isSelected = selectedTaskIds.includes(task.id);

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
               <Checkbox 
            checked={isSelected}
            onChange={()=>{
                dispatch(toggleTaskSelection(task.id))
            }}
            onPointerDown={(event)=> {
                event.stopPropagation();
            }}
            />

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