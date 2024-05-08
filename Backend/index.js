import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import endlUrl from './Controller/endlUrl.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Room from './Model/Room.js';
import zlib from 'zlib';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});

mongoose.connect('mongodb://localhost:27017/codeLink');

app.use(express.urlencoded({ extended:false}));

app.get('/', (req, res) => {
    res.send("Welcome");
});


app.get('/geturl',endlUrl)


io.on('connection', (socket) => {
    socket.on('room', async (room) => {
        socket.join(room);
        try {
            const compressCode  = await Room.findOne({ roomId: room });

            const roomData  = zlib.gunzipSync(compressCode.code).toString();

            io.to(room).emit('codeChange', roomData);
        } catch (error) {
            console.error("Error finding room:", error);
        }
    })

    socket.on('codeChange', async (code,room) => {

        try {
            const compressedCode = zlib.gzipSync(code);
            await Room.updateOne({ roomId: room }, { code: compressedCode });
            io.to(room).emit('codeChange', code);

        } catch (error) {
            console.error("Error updating code:", error);
        }

    })
    // console.log(socket);
    socket.on('disconnect', () => {
        
    });

});

server.listen(3000, () => {
    console.log('listening on 3000');
});
