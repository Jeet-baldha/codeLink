import Room from "../Model/Room.js";

const updateRoomMember = async (roomId,clientId) => {
    try {
        await Room.updateOne({ roomId: roomId },
            { $push: { members: clientId } });
    } catch (error) {
        console.log(error);
    }

}

export default updateRoomMember;