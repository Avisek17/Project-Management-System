import { describe ,expect, it } from "vitest";
import { createHistory, pushHistory, undoHistory, redoHistory } from "./history";

describe("history utilities", ()=> {
    it("create an initial history", ()=>{
        const history = createHistory("Todo");

        expect(history).toEqual({
            past:[],
            present:"Todo",
            future:[]
        })
    })
    it("stores the previous state when pushing new state",()=>{
        const history = createHistory("Todo");

        const nextHistory = pushHistory(
            history,
            "In Progress",
        );
        expect(nextHistory).toEqual({
            past:["Todo"],
            present:"In progress",
            future:[]
        })
    })
    it("undoes the latest state change", ()=>{
        let history = createHistory("Todo");

        history = pushHistory(history, "In Progress");

        const undone = undoHistory(history);

        expect(undone).toEqual({
            past:[],
            present:"Todo",
            future:["In progress"]
        })
    })
    it("redoes and undone state change",()=>{
        let history = createHistory("Todo");

        history = pushHistory(history, "In Progress");

        history = undoHistory(history);

        const redone = redoHistory(history);

        expect(redone).toEqual({
            past:["Todo"],
            present:["In Progress"],
            future:[]
        })
    })
    it("clears future history after a new state is pushed", ()=> {
        let history = createHistory("Todo");
        history = pushHistory(history, "In Progress");
        history = undoHistory(history);
        history = pushHistory(history, "Completed");

        expect(history).toEqual({
            past:["Todo"],
            present:"Completed",
            future:[],
        })
    })
})