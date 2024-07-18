import express from 'express';
import  mongoose from 'mongoose'
import User from '../Model/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const saltRound = 10;


router.post('/register', async (req,res) => {
    
    const {username,email,password} = req.body;
    let jwtTokenKey = process.env.JWT_SECRET_KEY;
try {
    
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
    
            const result = await newUser.save();
    
            let data = {
                _id:result._id.toString(),
            }
            const JWToken = jwt.sign(data,jwtTokenKey, { expiresIn: '24h' });
            res.send({message:`welcome ${username}`,jsonwebtoken:JWToken});
        })
    
} catch (error) {
    res.send({message:error.message,jsonwebtoken:""});
}

})

router.post('/login', async (req,res) => {

    const {username,password} = req.body;
    let jwtTokenKey = process.env.JWT_SECRET_KEY;

    try {
        const user = await User.findOne({username: username});

        if(!user){
            res.send("user not found");
        }
        else{
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                    let data = {
                        _id:result._id.toString(),
                    }
                    const JWToken = jwt.sign(data,jwtTokenKey, { expiresIn: '24h' });
                    res.send({message:`welcome ${username}`,jsonwebtoken:JWToken});
                }
                else{
                    res.status(201).send({message:"invalid password"});
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

