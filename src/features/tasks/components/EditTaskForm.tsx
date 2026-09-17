import { Stack,TextField,Button, MenuItem } from "@mui/material";
import { type CreateTaskFormData, createTaskSchema } from "../schemas/taskSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Task } from "../types/task.types";


interface EditTaskFormProps {
    task: Task;
    onSubmitTask:(data: CreateTaskFormData)=> void;
    onCancel:()=> void;
}

export default function EditTaskForm({task,onSubmitTask, onCancel}:EditTaskFormProps){
    const {register, handleSubmit, formState:{ errors }}= useForm<CreateTaskFormData>({
        resolver: zodResolver(createTaskSchema),
        defaultValues:{
            title:task.title,
            description: task.description,
            priority:task.priority,
            assignee:task.assignee,
            dueDate: task.dueDate
            }
    })
    return(
        <Stack 
        component={`form`}
        spacing={2}
        onSubmit={handleSubmit(onSubmitTask)}
        >
            <TextField
            label="Task title"
            fullWidth
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            />
            <TextField
        label="Description"
        multiline
        minRows={3}
        fullWidth
        {...register("description")}
        error={!!errors.description}
        helperText={errors.description?.message}
      />

      <TextField
        select
        label="Priority"
        fullWidth
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
          inputLabel: {
            shrink: true,
          },
        }}
        {...register("dueDate")}
        error={!!errors.dueDate}
        helperText={errors.dueDate?.message}
      />

      <Stack direction="row" spacing={1}>
        <Button type="submit" variant="contained">
          Save Changes
        </Button>

        <Button
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Stack>
        </Stack>
    )
}

