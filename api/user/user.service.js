const pool=require('../../config/database');

module.exports={
    create:(data,callBack)=>{
    
        pool.query(
            `insert into users(fName,lName,email,password)
            values(?,?,?,?)`,
            [
                data.fName,
                data.lName,
                data.email,
                data.password
            
            ],
              (err,results,fields)=>{
                  
                  if(err){
                    
                     return callBack(err)
                  }
                  return callBack(null,results)
              }
        )
    },
    getAllUsers:(callBack)=>{
          pool.query(`select * from users`,[],(err,results,fields)=>{
              if(err){
                  return callBack(err)
              }
              //console.log(results)
              return callBack(null,results)
          })
    },
    getUserById:(id,callBack)=>{
        pool.query(`select * from users where user_Id=?`,
        [id],
        (err,results,fields)=>{
            if(err){
                return callBack(err)
            }
            return callBack(null,results[0])
        })
    },
    updateUser:(data,callBack)=>{
        pool.query(
            `update users set fName=?,lName=?,email=?,password=? where user_Id=?`,
            [
                data.fName,
                data.lName,
                data.email,
                data.password,
                data.userId
            ],
            (err,results,fields)=>{
                if(err){
                    return callBack(err)
                }
                return callBack(null,results.affectedRows)
            }

        )
    },
    deleteUser:(data,callBack)=>{
       // console.log(data.userId)
      pool.query(  
          `delete from users where user_Id=?`,
           [data.userId],
           (err,results,fields)=>{
               if(err){
                   return callBack(err)
               }
               return callBack(null,results.affectedRows)
           }
      
      )

    },
   
    //for login function
    getUserByEmail:(email,callBack)=>{
        console.log(email)
        pool.query(
            `select * from users where email=?`,
            [email],
            (err,results,fields)=>{
             
                if(err){
                    return callBack(err)
                }
                return callBack(null,results[0])
            }
        )
    }

}