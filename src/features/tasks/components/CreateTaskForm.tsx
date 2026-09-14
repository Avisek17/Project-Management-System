import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button,TextField,Stack, MenuItem } from "@mui/material";
import { createTaskSchema, type CreateTaskFormData } from "../schemas/taskSchemas";


interface CreateTaskFormProps {
    onSubmit:(data:CreateTaskFormData)=> void;
}

export default function CreateTaskForm({onSubmit}: CreateTaskFormProps){
    const { register, handleSubmit,reset, formState: { errors}} = useForm<CreateTaskFormData>({
        resolver: zodResolver(createTaskSchema),
        defaultValues:{
            title:"",
            description:"",
            priority:"Medium",
            assignee:"",
            dueDate:""
        }
    })

    const handleFormSubmit = (data : CreateTaskFormData) => {
        onSubmit(data);
        reset();
    }

    return(
        <Stack 
        component={`form`}
        spacing={2}
        onSubmit={handleSubmit(handleFormSubmit)}
        >
            <TextField 
            label="Task Title"
            fullWidth
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            />

            <TextField 
            label="Task description"
            fullWidth
            multiline
            minRows={3}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
            />

            <TextField
            select
            label="Priority"
            fullWidth
            defaultValue={`Medium`}
            {...register("priority")}
            error={!!errors.priority}
            helperText={errors.priority?.message}
            > 
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
            </TextField>

             <TextField
                label="Assignee"
                fullWidth
                {...register("assignee")}
                error={!!errors.assignee}
                helperText={errors.assignee?.message}
            />

            <TextField 
            label="Due date"
            type="date"
            fullWidth
            slotProps={{
                inputLabel:{
                    shrink: true
                }
            }}
            {...register("dueDate")}
            error={!!errors.dueDate}
            helperText={errors.dueDate?.message}
            />

            <Button
            type="submit"
            variant="contained"
            >
                Create Task
            </Button>
        </Stack>
    )
}