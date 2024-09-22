import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


const protectRoute = async(req,res,next) =>{
     try{
        const token  = req.cookies.jwt;

        if(!token){
             return res.status(401).json({error:"unauthorized - no token found"});
        }


        const decode =   jwt.verify(token , process.env.JWTKEY);
        if(!decode){
            return res.status(401).json({error:"unauthorized - invalid found"});

        }

        const user = await User.findById(decode.userId).select("-password");//this means we remove the password for protection 
        if(!user){
            return res.status(401).json({error:"unauthorized - user not found "});

        }

        req.user = user ;
        next();//after we run everthing above we call the next function in router.post('/send/:id' ,protectRoute, sendMessage); we call sendMessage

     }catch(err){
        console.log("error in protectRoute");
        res.status(500).json({error:"internal server error "}); 
    }
}

export default protectRoute;

