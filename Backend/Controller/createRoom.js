import mongoose from "mongoose";
import Room from "../Model/Room.js";
import zlib from 'zlib';

const createRoom = async (roomId) => {
    try {
        const compressedCode = zlib.gzipSync("Welcome to codeLink");
        const newRoom = new Room({
            roomId: roomId,
            code:compressedCode
        });
        await newRoom.save();
        console.log("Room created successfully.");
    } catch (error) {
        console.error("Error creating room:", error);
    }
};

export default createRoom;
