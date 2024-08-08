import mongoose from "mongoose";
const favorite = new mongoose.Schema({
    name: String,
    img: String,
    types:[String]
  });
const User = mongoose.model('User',{
    name: String,
    email:String,
    password:String,
    avatar:String,
    favorites: [favorite],
})

export default User;