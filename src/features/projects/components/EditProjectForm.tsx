import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Stack, Button, TextField } from "@mui/material";

import { createProjectSchema, type CreateProjectFormData } from "../schemas/projectSchemas";

interface EditProjectFormProps {
    project : {
        name: string;
        description: string;
    };
    onSubmitProject:(data: CreateProjectFormData)=> void;
    onCancel: ()=> void;
}

export default function EditProjectForm({project, onSubmitProject, onCancel}: EditProjectFormProps){
    const { register, handleSubmit, formState:{ errors}} = useForm<CreateProjectFormData>({
        resolver: zodResolver(createProjectSchema),
        defaultValues:{
            name:project.name,
            description: project.description,
        }
    })
    return(
        <Stack
        
        component={`form`}
        spacing={2}
        onSubmit={handleSubmit(onSubmitProject)}
        >
            <TextField 
            label="Project name"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            />

            <TextField 
            label="Description"
            fullWidth
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
            />

            <Stack direction={`row`} spacing={1}>
                <Button
                type="submit"
                variant="contained"
                >
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