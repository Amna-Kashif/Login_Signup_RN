import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    mobile: String,
    password: String
})

const UserModel = new mongoose.model('userCollection', UserSchema);

export default UserModel




// const mongoose = require("mongoose");
// import mongoose from "mongoose";


// const UserDetailSchema = new mongoose.Schema(
//   {
//     name: String,
//     email: { type: String, unique: true },
//     mobile: String,
//     password: String,
//     image:String,
//     gender:String,
//     profession:String,
//     userType:String
    
  
//   },
//   {
//     collection: "UserInfo",
//   }
// );
// mongoose.model("UserInfo", UserDetailSchema);