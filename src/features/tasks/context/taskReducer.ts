import type { Task } from "../types/task.types";

export type TaskAction = 
| {
    type: "CREATE_TASK";
    task: Task;
}
| {
    type:"UPDATE_TASK";
    task:Task;
} 
| {
    type:"DELETE_TASK";
    taskId: string;
 } 
| {
    type:"MOVE_TASK";
    taskId: string;
    status: Task["status"]
}

export function taskReducer(
    state: Task[],
    action: TaskAction
):Task[] {
    switch(action.type){
        case "CREATE_TASK":
        return [...state,action.task];

        case "UPDATE_TASK":
        return state.map((task)=>
        task.id === action.task.id
    ? action.task : task,
    );

    case "DELETE_TASK":
    return state.filter((task)=>
    task.id !== action.taskId,)

    case "MOVE_TASK":
        return state.map((task)=>
        task.id === action.taskId ? {
            ...task,
            status: action.status
        }: task,
        )

        default:
            return state;
    }
}