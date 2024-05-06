import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import crypto from 'crypto'
import endlUrl from './Controller/endlUrl.js';

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


app.get('/geturl',endlUrl)


io.on('connection', (socket) => {

    socket.on('room', (room) => {
        socket.join(room);
    })

    socket.on('codeChange', (code,room) => {
        io.to(room).emit('codeChange',code)
    })
    // console.log(socket);
    socket.on('disconnect', () => {
        // console.log('A user disconnected');
    });

});

server.listen(3000, () => {
    console.log('listening on 3000');
});
