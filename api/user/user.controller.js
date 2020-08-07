require("dotenv").config();
const {
    create,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail
}=require('./user.service');

const {genSaltSync,hashSync,compareSync} =require('bcrypt')
const {sign}=require('jsonwebtoken')


module.exports={

    createUser:(req,res)=>{

        const user=req.body
        console.log(user.email)
        const salt=genSaltSync(10)
        user.password=hashSync(user.password,salt)

        create(user,(err,results)=>{
           
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    msg:"Internal server error(In database)",
                    sqlMessage:err.sqlMessage
                })
            }
            else{
               
            return res.status(200).json({
                success:1,
                data:results
            })
        }
        })
    },

    getUserById:(req,res)=>{
        const id=req.params.id
       // console.log(id)
        getUserById(id,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    msg:"Internal server error(In database)",
                    sqlMessage:err.sqlMessage
                })
            }
            if(!results){
                return res.json({
                    success:0,
                    msg:"Record not found"
                })
            }
            return res.json({
                success:1,
                data:results
            })
        

        })

    },

    getAllUsers:(req,res)=>{
        getAllUsers((err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                     msg:"Internal server error(In database)",
                     sqlMessage:err.sqlMessage
                })
            }
            return res.json({
              success:1,
              data:results  
            })

        })
    },

    updateUser:(req,res)=>{
        const body=req.body;
        const salt=genSaltSync(10);
        body.password=hashSync(body.password,salt)

        updateUser(body,(err,results)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:0,
                    msg:"Internal server error(In database)",
                    sqlMessage:err.sqlMessage
                })
            }
            //console.log(results)
            if(!results){
                return res.json({
                    success:0,
                    msg:'Record not found'
                })
            }

            return res.json({
                success:1,
                mag:'updated successfully'
            })
        })

    },

    deleteUser:(req,res)=>{
        const body=req.body
        deleteUser(body,(err,results)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:0,
                    msg:"Internal server error(In database)",
                    sqlMessage:err.sqlMessage
                })
            }
          //  console.log(results)
               if(!results){
                   return res.json({
                       success:0,
                       msg:'Record not found'
                   })
               } 

               return res.json({
                   success:1,
                   data:results,
                   msg:'user deleted successfully'
               })

        })
    },

    login:(req,res)=>{
        const body=req.body;
       // console.log("jjjjj",body.email)
        getUserByEmail(body.email,(err,results)=>{
            if(err){
                console.log(err)
            return res.status(500).json({
                    success:0,
                    msg:"Internal server error(In database)",
                    sqlMessage:err.sqlMessage
                })
            }
         if(!results){
          return  res.json({
                 success:0,
                 msg:'User not found'
             })
         }
       //  console.log(results)

         const result=compareSync(body.password,results.password)
         console.log(result)
         if(result){
             results.password=undefined;
             const jsonwebtoken=sign({result:results},process.env.TOKEN_KEY,{expiresIn:"1h"});
             return  res.json({
                 success:1,
                 msg:'Login Successful',
                 token:jsonwebtoken
             })
             
         }else{
            return res.json({
                 success:0,
                 msg:'Invalid Password'
             })
         }

        })

    }



}