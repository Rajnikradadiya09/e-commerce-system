import mongoose from "mongoose";

// User Schema

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    }
},{timestamps: true})


// User Modal

const UserModel = mongoose.model("user", UserSchema);


export default UserModel;