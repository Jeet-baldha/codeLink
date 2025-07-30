import mongoose from "mongoose";
import Room from "../Model/Room.js";
import zlib from 'zlib';

const createRoom = async (req, res) => {
    console.log("Creating room");
    try {
        const roomId = Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6);
        const clientId = req.body.clientId || 'anonymous';
        
        const newRoom = new Room({
            roomId: roomId,
            code: "Hello World",
            members: [clientId],
            peerId: null
        });
        await newRoom.save();
        
        res.json({
            success: true,
            roomId: roomId,
            message: "Room created successfully"
        });
    } catch (error) {
        console.error("Error creating room:", error);
        res.status(500).json({
            success: false,
            message: "Error creating room"
        });
    }
};

export default createRoom;
