import mongoose from 'mongoose';


const userschema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true,
        minlength:6
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    profilepicture :{
        type:String,
        default:""
    }
},
{timestamps:true}//this for created_At and updated_at 
);



const User = mongoose.model("User" , userschema);


export default User;