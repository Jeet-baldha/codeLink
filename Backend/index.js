import 'dotenv/config'
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import endlUrl from './Controller/endlUrl.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Room from './Model/Room.js';
import zlib from 'zlib';
import checkUrl from './Controller/checkUrl.js';
import createRoom from './Controller/createRoom.js';
import updateRoomMember from './Controller/updateRoomMember.js';
import updatePeerId from './Controller/updatePeerId.js';


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

mongoose.connect(process.env.MONGODB_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Welcome");
});


app.get('/geturl',endlUrl)
app.post('/checkUrl',checkUrl)
app.post('/updatePeerId',updatePeerId)


io.on('connection', (socket) => {
    socket.on('room', async (room) => {
        socket.join(room);
        const clientId = socket.id;
    
        try {
            if(io.sockets.adapter.rooms.get(room).size === 1){
                // createRoom(room,clientId)
            }
        } catch (error) {
            console.log(error);
        }

        // try {
        //     const compressCode  = await Room.findOne({ roomId: room });

        //     // const roomData  = zlib.gunzipSync(compressCode.code).toString();

        //     io.to(room).emit('codeChange', cod);
        // } catch (error) {
        //     console.error("Error finding room:", error);
        // }
    })
    socket.on('codeChange', async (code,room) => {

        try {
            // const compressedCode = zlib.gzipSync(code);
            // await Room.updateOne({ roomId: room }, { code: compressedCode });
            io.to(room).emit('codeChange', code);

        } catch (error) {
            console.error("Error updating code:", error);
        }

    })


    socket.on('sendPeer', (room, peerId) => {
        console.log(`Received sendPeer event. Room: ${room}, peerId: ${peerId}`);
        io.to(room).emit('sendPeer', peerId);
        console.log(`Sent peerId ${peerId} to room ${room}`);
    });

});

server.listen(port, () => {
    console.log('listening on ',port);
});
