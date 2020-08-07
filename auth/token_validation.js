require("dotenv").config();
const { verify, decode }=require('jsonwebtoken');


module.exports={
    checkToken:(req,res,next)=>{
        let token=req.get('authorization');
        console.log(token)
        if(token){
            token=token.slice(7);
            verify(token,process.env.TOKEN_KEY,(err,decoded)=>{
                if(err){
                    res.json({
                        success:0,
                        msg:'Invalid token'
                    });

                }
                else{
                    next();
                }

            })

        }
        else{
            res.json({
                success:0,  
                msg:'Access denied! unautorized user'          
            })
        }
    }
}