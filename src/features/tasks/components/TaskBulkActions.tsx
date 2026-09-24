import { Button, Stack, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectSelectedTaskCount, selectSelectedTaskIds } from "../store/taskSelectors";
import { selectAllTasks, clearTaskSelection, bulkUpdateStatus } from "../store/taskSlice";


interface TaskBulkActionsProps{
    projectId : string;
}

export default function TaskBulkActions({projectId}: TaskBulkActionsProps){
    const dispatch = useAppDispatch();

    const selectedTaskCount = useAppSelector( selectSelectedTaskCount);

    const selectedTaskIds = useAppSelector(selectSelectedTaskIds);

    const handleBulkStatusChange = 
    ( status : "Todo" | "In Progress" | "Completed")=>{
        dispatch(
            bulkUpdateStatus({
                taskIds: selectedTaskIds,
                status,
            }),
        );
        dispatch(clearTaskSelection())
    }

    if( selectedTaskCount === 0 ){
        return null;
    }
    return (
        <Stack 
        direction={`row`}
        spacing={2}
        sx={{
            alignItems:"center",
            mb:2
        }}
        >
            <Typography>
                {selectedTaskCount} task 
                {selectedTaskCount !== 1 ? "s" : ""} selected
            </Typography>

            <Button
            variant="outlined"
            size="small"
            onClick={()=> dispatch(selectAllTasks(projectId))}
            >
                Select All
            </Button>

            <Button
            variant="outlined"
            size="small"
            onClick={()=> dispatch(clearTaskSelection())}
            >
                Clear
            </Button>

            <Button
            variant="outlined"
            onClick={()=> handleBulkStatusChange("Todo")}
            >
                Todo
            </Button>

            <Button
            variant="outlined"
            onClick={()=> handleBulkStatusChange('In Progress')}
            >
                In Progress
            </Button>

            <Button
            variant="outlined"
            onClick={()=> handleBulkStatusChange("Completed")}
            >
                Completed
            </Button>
        </Stack>
    )
}
