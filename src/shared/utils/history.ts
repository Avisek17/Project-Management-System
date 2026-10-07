export interface HistoryState<T>{
    past: T[];
    present: T;
    future:T[];
}

export function createHistory<T>(initialState: T): HistoryState<T> {
    return{
        past:[],
        present: initialState,
        future:[]
    }
}

export function pushHistory<T>(
    history: HistoryState<T>,
    nextState: T,
): HistoryState<T> {
    return{
        past:[...history.past, history.present],
        present: nextState,
        future:[]
    }
}

export function undoHistory<T>(
    history: HistoryState<T>,
): HistoryState<T>{
    if(history.past.length === 0){
        return history;
    }
    const previousState = history.past[history.past.length - 1];
    return{
        past: history.past.slice(0,-1),
        present:previousState,
        future:[history.present, ...history.future]
    }
}

export function redoHistory<T>(
    history:HistoryState<T>
): HistoryState<T>{
    if(history.future.length === 0){
        return history;
    }
    const nextState = history.future[0];

    return{
        past:[...history.past, history.present],
        present:nextState,
        future: history.future.slice(1)
    }
}