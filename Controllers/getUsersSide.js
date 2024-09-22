
import User from "../models/userModel.js";


export const getUsersSide =async (req,res) => {
    try{
        const logUser = req.user._id;

        //fetching all the users from the db 
        const allUsers = await User.find({ _id: { $ne: logUser }} ).select("-password");//find all the users except the login user id n
        
        res.status(200).json(allUsers);

    }catch(err){
        console.error("error in getUsersSide")
        res.status(500).json(err);
    }
}