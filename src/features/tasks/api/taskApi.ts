import { tasks as initialTasks } from "../data/tasks";
import type { Task } from "../types/task.types";

// Clone initial tasks so they are not affected by Redux Toolkit's Object.freeze in dev mode
let mockTasks: Task[] = initialTasks.map((task) => ({ ...task }));

export async function fetchTasks(
  projectId: string,
  signal?: AbortSignal,
): Promise<Task[]> {
  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, 300);

    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new DOMException("Request aborted", "AbortError"));
      },
      { once: true },
    );
  });

  return mockTasks
    .filter((task) => task.projectId === projectId)
    .map((task) => ({ ...task }));
}

export async function updateTaskStatus(
  taskId: string,
  status: Task["status"],
): Promise<Task> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const index = mockTasks.findIndex((task) => task.id === taskId);

  if (index === -1) {
    throw new Error("Task not found.");
  }

  const updatedTask: Task = {
    ...mockTasks[index],
    status,
  };

  mockTasks = mockTasks.map((task, i) => (i === index ? updatedTask : task));

  return { ...updatedTask };
}