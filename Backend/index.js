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

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());



const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://codelink-frontend.onrender.com/"
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

server.listen(port, () => {
    console.log('listening on ',port);
});
