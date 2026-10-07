import { useState } from "react";

import { createHistory, pushHistory, undoHistory, redoHistory } from "@/shared/utils/history";

import type { HistoryState } from "@/shared/utils/history";
import type { TaskStatusChange } from "../types/taskHistory.types";

export function useTaskHistory(){
    const [history, setHistory ] = useState<HistoryState<
    TaskStatusChange | null>>(()=>
    createHistory<TaskStatusChange | null>(null));

    const recordChange = (change: TaskStatusChange)=> {
        setHistory((currentHistory)=>
        pushHistory(currentHistory, change),
    )
    }

    const undo = () => {
        setHistory((currentHistory)=> 
        undoHistory(currentHistory))
    }

    const redo = () => {
        setHistory((currentHistory)=> 
        redoHistory(currentHistory))
    }

    return{
        history, recordChange, undo, redo
    }
}