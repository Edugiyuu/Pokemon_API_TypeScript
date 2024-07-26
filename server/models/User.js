import mongoose from "mongoose";

const User = mongoose.model('User',{
    name: String,
    email:String,
    password:String,
    avatar:String,
    favorites: [String]
})

export default User;