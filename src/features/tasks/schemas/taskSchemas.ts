import { z } from "zod";

export const createTaskSchema = z.object({
    title : z
    .string()
    .min(1, " Task title is required")
    .max(100, "Task title must be less than 100 characters"),

    description : z
    .string()
    .min(1,"Task description is required")
    .max(500, "Task description must be less than 100 characters"),

    priority: z.enum(["Low", "Medium", "High"]),

    assignee: z
    .string()
    .min(1,"Assignee is required"),

    dueDate: z
    .string()
    .min(1,"Due date is required"),

})

export type CreateTaskFormData = z.infer<typeof createTaskSchema>