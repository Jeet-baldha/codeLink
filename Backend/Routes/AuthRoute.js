import express from 'express';
import  mongoose from 'mongoose'
import User from '../Model/User.model.js';
import bcrypt from 'bcrypt';


const router = express.Router();
const saltRound = 10;


router.post('/register', async (req,res) => {
    


    const {username,email,password} = req.body;

    bcrypt.hash(password,saltRound, async(err,hash) => {

        if(err) {
            console.log(err);
            res.send(err.message || err);
        }
        const newUser = new User({
            username: username,
            password: hash,
            email: email
        })

        await newUser.save();
    })

    res.send("welcome " + username);

})

router.post('/login', async (req,res) => {

    const {username,password} = req.body;

    try {
        const user = await User.findOne({username: username});

        if(!user){
            res.send("user not found");
        }
        else{
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                    res.send("Login successfully")
                }
                else{
                    res.send("invalid password");
                }
            });
        }

    } catch (error) {
        res.send(error.message);
    }

})

router.post('/logout', (req,res) => {
    
})

export default router;

