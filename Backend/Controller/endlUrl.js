import crypto from 'crypto'



let activeUrl = [];


const endlUrl = (req,res) => {

    const isUniuqe = true;
    let url = crypto.randomBytes(3).toString('hex');
    activeUrl.push(url);    
    res.send(url);

}

export default endlUrl;