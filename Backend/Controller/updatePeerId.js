import Room from "../Model/Room.js";


const updatePeerId = async(req,res) =>{

    console.log(req.body);
    const roomId = req.body.roomID;
    const peerId = req.body.peerID;
    console.log(roomId, " " , peerId);

    try {
        
        const room = await Room.findOne({roomId:roomId});

        if(room.peerId == null){
            await Room.updateOne({roomId:roomId},{peerId:peerId});
            res.send({message: 'Room updated successfully'});
        }

    } catch (error) {
        console.log(error);
        res.send({message:error.message});
    }

}

export default updatePeerId;