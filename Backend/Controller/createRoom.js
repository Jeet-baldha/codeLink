import mongoose from "mongoose";
import Room from "../Model/Room.js";
import zlib from 'zlib';

const createRoom = async (roomId,clientId) => {
    console.log("Creating room");
    try {
        // const compressedCode = zlib.gzipSync("Welcome to codeLink");
        const newRoom = new Room({
            roomId: roomId,
            code:"Hello Moto",
            members: [clientId],
            peerId:null
        });
        await newRoom.save();
    } catch (error) {
        console.error("Error creating room:", error);
    }
};

export default createRoom;
