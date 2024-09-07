import 'dotenv/config'
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import redis from 'redis'
import endlUrl from './Controller/endlUrl.js';
import mongoose from 'mongoose';
import checkUrl from './Controller/checkUrl.js';
import updatePeerId from './Controller/updatePeerId.js';
import Auth from './Routes/AuthRoute.js'
import leetcode from './Routes/leetCodeProblemRoute.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const server = http.createServer(app);

const redisClient = redis.createClient({
    url: 'redis://127.0.0.1:6379'
});

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

mongoose.connect(process.env.MONGODB_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', Auth);
app.use('/problem',leetcode);

app.get('/', (req, res) => {
    res.send("Welcome");
});


app.get('/geturl', endlUrl)
app.post('/checkUrl', checkUrl)
app.post('/updatePeerId', updatePeerId)

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

(async () => {
    await redisClient.connect();
    io.on('connection', (socket) => {

        socket.on('room', async (room) => {
            socket.join(room);
            try {
                const newCode = await redisClient.get(room);
                if (io.sockets.adapter.rooms.get(room).size === 1 && newCode === null) {
                    await redisClient.set(`code:${room}`, "Hello world")
                    await redisClient.expire(`code:${room}`,24*60*60);
                    io.to(room).emit("codeChange", "Hello world")
                }
                else {
                    io.to(room).emit('codeChange', newCode);
                }

            } catch (error) {
                console.log(error);
            }

        })

        socket.on('codeChange', async (code, room) => {

            try {
                await redisClient.set(room, code)
                socket.broadcast.to(room).emit('codeChange', code);

            } catch (error) {
                console.error("Error updating code:", error);
            }

        })

    });
})();



server.listen(port, () => {
    console.log('listening on ', port);
});
