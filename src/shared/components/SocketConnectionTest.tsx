import { useEffect, useState } from "react";
import { socket } from "../api/socket";

export function SocketConnectionTest(){
    const[connected, setConected ] = useState(socket.connected);
    const[ response, setResponse ] = useState("");

    useEffect(()=>{
        const handleConnect = ()=> setConected(true);
        const handleDisconnect = ()=> setConected(false);

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);

        socket.connect();

        const handleTaskUpdated = (payload: {
            taskId: string;
            projectId: string;
            status: "Todo" | "In Progress" | "Completed";
        }) => {
            setResponse(`Task ${payload.taskId} moved to ${payload.status}`)
        }
        socket.on("task:updated", handleTaskUpdated)

        return() =>{
            socket.off("connect", handleConnect);
            socket.off("task:updated", handleTaskUpdated);
            socket.off("disconnect", handleDisconnect);
            socket.disconnect();
        }
    },[]);

    const sendMessage = () => {
        socket.emit(
            "message",
            {
                text: "Hello from React"
            },
            (
                result:{
                    event: string;
                    data:{
                        received: string;
                        socketId: string;
                    }
                }
            )=>{
                setResponse(
                    `server received: ${result.data.received}`,
                )
            }
        )
    }
    
    return(
        <div>
            <p>Socket status: {connected ? "Connected" : "Disconnected"}</p>
            <button
            onClick={sendMessage} 
            disabled={!connected}
            >
                send test message
            </button>
            <p>{response}</p>
            <button
            onClick={()=> {
                socket.emit("task:move", {
                    taskId:"task-123",
                    projectId:"project-123",
                    status:"In Progress"
                })
            }}
            disabled={!connected}
            >
                Test task broadcast
            </button>
        </div>
    )
}