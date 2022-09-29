// const express = require('express');
// const app = express();

// const server = require('http').createServer(app);
// const io = require('socket.io')(server, {
//     cors: {
//         origin: "*"
//     }
// });

// const users = [];
// const messages = {
//     general: [],
//     node: []
// };

// io.on("connection", (socket) => {
//     console.log(socket.id);
//     console.log(users)
//     socket.on("join-server", (data) => {
//         const user = {
//             username: data.username,
//             id: socket.id
//         }
//         users.push(user);
//         io.emit("userList", users);
//     });
//     socket.on("join-room", (data) => {
//         socket.join(data.roomId);
//         console.log(data.sender_uid+"joined"+data.uid)
//         socket.emit("joined", messages[roomId]);
//     });
    
    

// })
 


// server.listen(5000, () => {
//     console.log("server is listening...");
// });