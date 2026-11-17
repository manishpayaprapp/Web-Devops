import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface SocketRoom {
  socket: WebSocket;
  room: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

const allSockets: SocketRoom[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    let parsedMessage: unknown;

    try {
      parsedMessage = JSON.parse(message.toString());
    } catch (error) {
      console.error("Received invalid JSON over WebSocket:", error);
      return;
    }

    if (!isRecord(parsedMessage) || !isRecord(parsedMessage.payload)) {
      console.warn("Received an invalid WebSocket message.");
      return;
    }

    if (parsedMessage.type === "join") {
      const roomId = parsedMessage.payload.roomId;
      if (typeof roomId !== "string" || roomId.length === 0) {
        console.warn("Received a join message without a valid roomId.");
        return;
      }

      const existingRoom = allSockets.find((entry) => entry.socket === socket);
      if (existingRoom) {
        existingRoom.room = roomId;
      } else {
        allSockets.push({ socket, room: roomId });
      }
      return;
    }

    if (parsedMessage.type === "chat") {
      const chatMessage = parsedMessage.payload.message;
      const currentUserRoom = allSockets.find((entry) => entry.socket === socket)?.room;

      if (typeof chatMessage !== "string" || !currentUserRoom) {
        console.warn("Received a chat message from a socket that has not joined a room.");
        return;
      }

      for (const entry of allSockets) {
        if (entry.room === currentUserRoom && entry.socket.readyState === WebSocket.OPEN) {
          entry.socket.send(chatMessage);
        }
      }
    }
  });

  socket.on("close", () => {
    const socketIndex = allSockets.findIndex((entry) => entry.socket === socket);
    if (socketIndex !== -1) {
      allSockets.splice(socketIndex, 1);
    }
  });
});
