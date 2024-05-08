import crypto from 'crypto'
import createRoom from './createRoom.js';

const endlUrl = (req,res) => {

    let url = crypto.randomBytes(3).toString('hex');

    createRoom(url);

    res.send(url);

}

export default endlUrl;