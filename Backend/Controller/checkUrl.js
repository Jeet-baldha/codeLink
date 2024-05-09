
import { urlList } from './endlUrl.js';

const checkUrl = (req, res) => {

    try {
        if (urlList.find((url) => url === req.body.url) === undefined) {
            res.send(false);
        } else {
            res.send(true);
        }

    } catch (error) {
        res.status(400).send({error: error.message});
    }

}

export default checkUrl;