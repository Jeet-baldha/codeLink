import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    roomId: String,
    members: [String], // Assuming members are represented by their IDs
    code: Buffer,
    peerId:String
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
