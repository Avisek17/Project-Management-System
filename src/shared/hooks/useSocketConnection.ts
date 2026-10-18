import { useEffect } from "react";
import { socket } from "../api/socket";

export function useSocketConnection() {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      // Remove component-specific listeners in their own hooks.
      // Don't disconnect the shared socket here.
    };
  }, []);
} 