# Root Cause Analysis & Solution: Project Board Drag-and-Drop Issue

## 1. Executive Summary

In the project management board, dragging a task to another column triggered the drag-and-drop event and correctly detected the target column (`overId`), but immediately snapped or reverted back to its original column. 

The issue was caused by an interaction between **Redux Toolkit's state immutability enforcement (`immutableCheck`)** and the **mock server API** used by **TanStack Query**.

---

## 2. Root Cause Breakdown

### A. Redux Toolkit's Dev-Mode Deep Freezing
In [`src/features/tasks/store/taskSlice.ts`](file:///e:/project-management-system/src/features/tasks/store/taskSlice.ts), the initial state was imported directly from [`src/features/tasks/data/tasks.ts`](file:///e:/project-management-system/src/features/tasks/data/tasks.ts):

```typescript
import { tasks as initialTasks } from "../data/tasks";

const initialState: TaskState = {
  items: initialTasks, // Raw reference to the exported array
  selectedTaskIds: [],
};
```

When the Redux store initialized, Redux Toolkit’s development middleware (`immutableCheck`) recursively called `Object.freeze()` on the state tree. Because `initialTasks` was passed by reference, the raw data array in `data/tasks.ts` and all task objects within it were **deeply frozen in memory**.

### B. Direct Mutation Failure in `taskApi.ts`
When dragging a task on the board, TanStack Query called `updateTaskStatus`:

```typescript
export async function updateTaskStatus(taskId: string, status: Task["status"]) {
  const task = tasks.find((task) => task.id === taskId);
  task.status = status; // ❌ Throws TypeError in strict mode
  return task;
}
```

Because `task` was frozen by Redux Toolkit, JavaScript threw a silent or unhandled runtime error:
```
TypeError: Cannot assign to read only property 'status' of object '#<Object>'
```

### C. The Rollback Mechanism
In [`src/features/tasks/hooks/useUpdateTaskStatus.ts`](file:///e:/project-management-system/src/features/tasks/hooks/useUpdateTaskStatus.ts):
1. `onMutate` ran an optimistic update: TanStack Query updated the cache in memory, so the card momentarily appeared in the new column.
2. `mutationFn` (`updateTaskStatus`) threw the `TypeError`.
3. TanStack Query intercepted the rejected Promise and triggered `onError`:
   ```typescript
   onError: (_error, _variables, context) => {
     if (!context) return;
     queryClient.setQueryData(context.queryKey, context.previousTasks); // ❌ Rollback
   }
   ```
4. The cache was restored to `previousTasks`, causing the card to **immediately snap back to the origin column**.

---

## 3. Implementation of the Solution

### 1. Decoupling the Server Mock Data from Redux ([`taskApi.ts`](file:///e:/project-management-system/src/features/tasks/api/taskApi.ts))
Created an independent, cloned dataset `mockTasks` for the API so Redux's state check never freezes the server data. Updates to tasks are applied immutably:

```typescript
import { tasks as initialTasks } from "../data/tasks";
import type { Task } from "../types/task.types";

// Clone initial tasks so they are completely decoupled from Redux Toolkit's Object.freeze
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
```

### 2. Safeguarding Redux Initial State ([`taskSlice.ts`](file:///e:/project-management-system/src/features/tasks/store/taskSlice.ts))
Cloned the tasks when initializing Redux state to ensure Redux never locks shared data:

```typescript
const initialState: TaskState = {
  items: initialTasks.map((t) => ({ ...t })),
  selectedTaskIds: [],
};
```

### 3. Solidifying TanStack Query Mutation Lifecycle ([`useUpdateTaskStatus.ts`](file:///e:/project-management-system/src/features/tasks/hooks/useUpdateTaskStatus.ts))
- **Optimistic Updates (`onMutate`)**: Preemptively cancel in-flight queries and update the cache for instant UI feedback.
- **Success Reconcile (`onSuccess`)**: Update query cache with verified server data.
- **Error Rollback (`onError`)**: Restore `previousTasks` if the server operation genuinely fails.
- **Cache Invalidation (`onSettled`)**: Invalidate `taskQueryKeys.byProject(projectId)` so client and server remain synchronized.

### 4. Preserving the UI & DND Experience
- **[`TaskColumn.tsx`](file:///e:/project-management-system/src/features/tasks/components/TaskColumn.tsx)**: Maintained 100% of your original styling, structure, and sizing.
- **[`DraggableTask.tsx`](file:///e:/project-management-system/src/features/tasks/components/DraggableTask.tsx)**: Maintained your original component design, checkbox handlers, and transform styles.
- **[`ProjectBoardPage.tsx`](file:///e:/project-management-system/src/features/projects/pages/ProjectBoardPage.tsx)**: Retained your exact board layout, header, bulk action triggers, and drag overlay rendering.

---

## 4. Verification

| Check | Expected Result | Status |
|---|---|---|
| Drag card across columns | `handleDragEnd` fires with target `overId` | ✅ Passing |
| Mutation execution | `updateTaskStatus` completes without `TypeError` | ✅ Passing |
| Cache synchronization | TanStack Query updates cache optimistically and settles | ✅ Passing |
| UI fidelity | Zero changes to board colors, cards, fonts, or layout | ✅ Verified |
