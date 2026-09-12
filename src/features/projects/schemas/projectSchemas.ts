import { z } from "zod";

export const createProjectSchema = z.object({
    name: z
    .string()
    .min(1,"Project name is required.")
    .max(100, "Project name must be less than 100 characters."),

    description: z
    .string()
    .min(1, "Project description is required")
    .max(500, "project description must be less than 500 characters."),
})

export type CreateProjectFormData = z.infer< typeof createProjectSchema >