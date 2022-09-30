const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;

const server = require('http').createServer(app);

const socket = require("socket.io-client")("react-chat-app.onrender.com");



const io = require('socket.io')(server, {
    transports: ['websocket'],
    maxHttpBufferSize: 1e9,
    pingTimeout: 3000000,
    cors: {
        origin: "https://node-chat-app-51q9.onrender.com"
    }
});


io.on("connection", (socket) => {
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
    console.log(socket.id);
    socket.on("join", (data) => {
        socket.join(data.roomId);
        console.log(data.userId, "Joined ", data.roomId);
        socket.emit("getRoomId", data.roomId);
    });

    socket.on("send", (data) =>{
        console.log(data.text);
        io.to(data.roomId).emit("getMessage", {
            text: data.text,
            roomId: data.roomId,
            userId: data.userId,
            sendUsername: data.sendUsername
        });
    });

    socket.on('upload', async(base64, imageObject) => {
        console.log(imageObject.sendUsername,"sent an image...")
        io.to(imageObject.roomId).emit("getImage", {
            base64: base64,
            roomId: imageObject.roomId,
            userId: imageObject.userId,
            sendUsername: imageObject.sendUsername
        });
    });

    socket.on('uploadMedia', async(arrayBuffer, videoObject) => {
        console.log(arrayBuffer)
        io.to(videoObject.roomId).emit("getMedia", {
            buffer: arrayBuffer,
            roomId: videoObject.roomId,
            userId: videoObject.userId,
            sendUsername: videoObject.sendUsername
        });

    });

});


app.get("/", (req, res) =>{
    res.send(`<h1>This is HomePage</h1>`)
})


server.listen(PORT, () => {
    console.log("server is listening...");
});