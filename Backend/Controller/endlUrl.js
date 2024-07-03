import crypto from 'crypto'
import createRoom from './createRoom.js';

let activeUrl = ['1212'];

const endlUrl = (req,res) => {

    let url = crypto.randomBytes(8).toString('hex');
    activeUrl.push(url);
    res.send(url);

}

export default endlUrl;
export const urlList = activeUrl;