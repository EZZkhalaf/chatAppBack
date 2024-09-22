import jwt from 'jsonwebtoken';


const generateT = (userId , res) =>{
    const token = jwt.sign({userId} , process.env.JWTKEY , {
        expiresIn:'15d'
    });

    res.cookie("jwt" , token , {
        maxAge :  15*24*60*60*1000 , //mellisec
        httponly:true, //prevent xss attacks (scripting attacks)
        samesite:"strict" , //for other attacks 
        secure : process.env.NODE_SECURE !=="deployment"
    });


}

export default generateT;