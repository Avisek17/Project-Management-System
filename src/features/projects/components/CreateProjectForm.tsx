import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button,Stack, TextField } from "@mui/material";

import { createProjectSchema, type CreateProjectFormData } from "../schemas/projectSchemas";

interface CreateProjectFormProps {
    onSubmitProject: (data: CreateProjectFormData) => void;
}

export default function CreateProjectForm({onSubmitProject}:CreateProjectFormProps){

    const {register, handleSubmit, reset, formState:{ errors }} = useForm<CreateProjectFormData>({
        resolver: zodResolver(createProjectSchema),
        defaultValues:{
            name:"",
            description:"",
        }
    })

    const handleFormSubmit = (data: CreateProjectFormData)=> {
        onSubmitProject(data);
        reset();
    }

    return(
        <Stack
        component={`form`}
        spacing={2}
        onSubmit={handleSubmit(handleFormSubmit)}
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

            <Button
            type="submit"
            variant="contained"
            >
                Create Project
            </Button>
        </Stack>
    )
}