import {WebSocketServer} from "ws";

const wss = new WebSocketServer({port:8080});

wss.on("connection" , function(socket){
    console.log("User Connected");
        socket.send("Solana Price is" + Math.random());

        socket.on("message", e =>{
            console.log(e.toString())
        })
    
})