import type { Project } from "../types/project.types";

export const projects: Project[] = [
    {
    id: "1",
    name: "Project Management System",
    description: "Internal project and task management platform.",
    status: "In Progress",
    membersCount: 5,
    tasksCount: 24,
    createdAt: "2026-09-01",
  },
  {
    id: "2",
    name: "E-commerce Platform",
    description: "Online store with product and order management.",
    status: "Completed",
    membersCount: 4,
    tasksCount: 32,
    createdAt: "2026-08-15",
  },
  {
    id: "3",
    name: "Team Collaboration App",
    description: "Real-time collaboration platform for remote teams.",
    status: "Planning",
    membersCount: 6,
    tasksCount: 12,
    createdAt: "2026-09-05",
  },
]