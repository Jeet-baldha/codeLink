
import { urlList } from './endlUrl.js';

const checkUrl = (req, res) => {

    try { 
        if (urlList.findIndex((url) => url === req.body.url) === -1) {
            res.status(404).send(false);
        } else {
            res.status(200).send(true);
        }

    } catch (error) {
        res.status(400).send({error: error.message});
    }

}

export default checkUrl;