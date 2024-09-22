import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import generateT from "../utils/generateT.js";



export  const register = async(req,res) =>{
    try{

            const {fullName , userName, password , Cpassword , gender } = req.body
            if(password !== Cpassword){
                return res.status(400).json({error :"passwords dont match"});
            }


            const user = await User.findOne({userName});
            if (user){

                return res.status(400).json({error :"user name already exists"});
            }

            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password , salt);

            const boyPic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
            const girlPic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
            const NewUser = new User({
                fullName,
                userName,
                password :hashPass,
                gender,
                profilepicture:gender === "male"? boyPic : girlPic


            });

            if(NewUser){
                 generateT(NewUser._id , res);//generate JWT

                 await NewUser.save();//save it to the db 
    
                res.status(201).json({
                    _id:NewUser._id,
                    fullName:NewUser.fullName,
                    userName:NewUser.userName,
                    profilepicture:NewUser.profilepicture
                })
            }else{
                res.status(400).json("invalid user data");  

            }




    }catch(err){
        console.error("error in register controller" , err.message);
        res.status(500).json("internal server error ");  
    }


}



export const login = async(req,res) =>{
    try{
        const {userName , password} = req.body;
        const user =  await User.findOne({userName});
        const passwordCorrect = await bcrypt.compare(password , user?.password ||"");
        if (!user || !passwordCorrect){
            return res.status(500) . json({error:"invalid user name or password"});
        }

        generateT(user._id ,res );

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            userName : user.userName,
            profilepicture:user.profilepicture
        });


    }catch(err){
        console.error("error in login controller" , err.message);
        res.status(500).json("internal server error ");  
    }
   
}   


export const logout = async (req,res) =>{
    try{
       res.cookie("jwt" , "", {maxAge:0});
       res.status(200).json("logout successfully ");
    }catch(err){
        console.error("error in logout controller" , err.message);
        res.status(500).json("internal server error ");  
    }

}
