import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username : String,
    email: String,
    password : String,
    googleLogin:Boolean
})

const User = mongoose.model('User',userSchema);

export default User;