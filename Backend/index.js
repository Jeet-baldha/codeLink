import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});

app.get('/', (req, res) => {
    res.send("Welcome");
});


io.on('connection', (socket) => {
    console.log('A user connected');


    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('codeChange', (code) => {
        console.log(code);
        // Broadcast the received code to all clients, including the sender
        io.emit('codeChange', code); // Update latestCode with the received code
    });

    // Handle the client's request for the latest code
});

server.listen(3000, () => {
    console.log('listening on 3000');
});
