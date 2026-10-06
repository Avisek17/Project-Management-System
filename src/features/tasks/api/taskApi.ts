import { tasks as initialTasks } from "../data/tasks";
import type { Task } from "../types/task.types";

import type { TaskFilters } from "../types/taskFilter.types";
import type { PaginatedTasks } from "../types/paginatedTasks.types";

// Clone initial tasks so they are not affected by Redux Toolkit's Object.freeze in dev mode
let mockTasks: Task[] = initialTasks.map((task) => ({ ...task }));

export async function fetchTasks(
  projectId: string,
  searchTerm = "",
  filters?: TaskFilters,
  page = 1,
  limit = 10,
  signal?: AbortSignal,
): Promise<PaginatedTasks> {
  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, 300);

    signal?.addEventListener(
      "abort",
      () => {
        console.log(
      "FETCH ABORTED:",
      projectId,
      searchTerm,
    );
        clearTimeout(timer);
        reject(new DOMException("Request aborted", "AbortError"));
      },
      { once: true },
    );
  });

  const search = searchTerm.toLowerCase().trim();

  const filteredTasks = mockTasks
    .filter((task) => task.projectId === projectId)
    .filter((task)=>{
        if(!search) return true;

        return(
            task.title.toLowerCase().includes(search) ||
            task.description.toLowerCase().includes(search)
        )
    })
    .filter((task)=>{
        if(!filters || filters.status ==="All"){
            return true;
        }
        return task.status === filters.status;
    })
    .filter((task)=>{
        if(!filters || filters.priority ==="All"){
            return true;
        }
        return task.priority === filters.priority;
    })
    .filter((task)=>{
        if(!filters || filters.assignee === "All"){
            return true;
        }
        return task.assignee === filters.assignee;
    })
    .filter((task)=>{
        if(!filters || filters.dueDate ==="All"){
            return true
        }
        if(filters.dueDate === "Overdue" && 
            task.status ==="Completed"){
                return false;
            }
        const today = new Date();
        today.setHours(0,0,0,0);

        const dueDate = new Date(`${task.dueDate}T00:00:00`);

        if(filters.dueDate ==="Overdue"){
            return dueDate < today;
        }
        return dueDate >= today;
    })

const total = filteredTasks.length;

const startIndex = (page - 1) * limit;

const items = filteredTasks
  .slice(startIndex, startIndex + limit)
  .map((task) => ({ ...task }));

return {
  items,
  total,
  page,
  limit,
  totalPages: Math.ceil(total / limit),
};
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
