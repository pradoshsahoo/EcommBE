const jwt = require('jsonwebtoken');

const Auth = async (req,res,next)=>{
    try{
    const token = req.headers['x-auth-token'];
    if(!token)
    {
        return res.status(401).json({
            message:"Missing auth token"
        })
    }
    console.log(await jwt.verify(token,'siliconMERNCourse'));
    if(await jwt.verify(token,'siliconMERNCourse'))
    {
        next(); 
    }
    else{
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    }
    catch(err)
    {
        return res.status(500).json({
            message:"Unauthorized"
        })
    }
}

module.exports = Auth
