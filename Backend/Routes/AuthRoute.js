import express from 'express';
import  mongoose from 'mongoose'
import User from '../Model/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const router = express.Router();
const saltRound = 10;


router.post('/register', async (req,res) => {
    
    const {username,email,password} = req.body;
    let jwtTokenKey = process.env.JWT_SECRET_KEY;
try {

    const user = await User.findOne({email: email});
    
        if(user){
            res.send({message:"User alredy exits"})
        }
        else{

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
    }
    
} catch (error) {
    res.send({message:error.message,jsonwebtoken:""});
}

})

router.post('/login', async (req,res) => {

    const {email,password} = req.body;
    let jwtTokenKey = process.env.JWT_SECRET_KEY;

    try {
        const user = await User.findOne({email: email});

        if(!user){
            res.status(201).send({message:"User not found"});
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


router.post('/googleAuthVerify', async (req, res) => {

    try {
        const token = req.body.token;

        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        })

        const tokenData = ticket.getPayload();

        const user = await User.findOne( { 'email' : tokenData.email});

        if(user){
            let data = {
                _id:user._id.toString(),
            }
            const JWToken = jwt.sign(data,process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
            res.send({message:`welcome ${tokenData.name}`,jsonwebtoken:JWToken});
        }
        else{
            const newUser = new User({
                username: tokenData.name,
                email: tokenData.email,
            })
    
            const result = await newUser.save();

            let data = {
                _id:result._id.toString(),
            }
            const JWToken = jwt.sign(data,process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
            res.send({message:`welcome ${tokenData.name}`,jsonwebtoken:JWToken});
    
        }

        
    } catch (error) {
        res.send({message:error.message});
    }



})

router.post('/logout', (req,res) => {
    
})


export default router;

