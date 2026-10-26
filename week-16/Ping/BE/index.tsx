import {WebSocketServer , WebSocket} from "ws";
import { number } from "zod";

const wss = new WebSocketServer({port:8080});

interface Sockets{
    socket : WebSocket
    room : string
}
let users = 0;
let allSockets : Sockets[] = [];

wss.on("connection" , function(socket){
    // allSockets.push(socket);
    // users ++;
    // console.log("User #"+  users + "Connected");

        socket.on("message", (message)=>{
            const parsedMessage = JSON.parse(message);

            if(parsedMessage.type === "join"){
                allSockets.push({
                    socket,
                    room : " qfghjhgfdsd"
                })
            }
        })

        socket.on("disconnected", () => {
            allSockets = allSockets.filter(x => x != socket);
        })
    
})