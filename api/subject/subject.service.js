const pool=require('../../config/database');
const { poolPromise }=require('../../config/MssqlDB');

module.exports={

    addSubject:(data,callBack)=>{
        pool.query(
            `insert into subject(name,medium)
            values(?,?)`,
            [
             data.name,
             data.medium
            ],
              (err,results,fields)=>{
                  if(err){
                    return callBack(err)
                  }
                 return callBack(null,results)
                //  pool.query('select * from subject where sub_id=?',[results.insertId],(err,user)=>{
                //      if(err){
                //          return callBack(err)
                //      }
           
                //      return callBack(null,user)
                //  })
              }
        )
    },




    getAllSubjects:(callBack)=>{
        pool.query(`select *from subject`,[],(err,results,fields)=>{
            if(err){
                return callBack(err)
            }

           
            return callBack(null,results)
        })
    },

   /* getSubjectById:(id,callBack)=>{
        pool.query(`select * from subject where sub_id=?`,
        [id],
        (err,results,fields)=>{
            if(err){
                return callBack(err)
            }
            return callBack(null,results)
        })
    },    */

    getSubjectById:(async(id,callBack) => {
        try {
          const pool =  await poolPromise
          const result = await pool.request()
          //const result=new pool.Request()
            .input('id', id)
            .query('select * from subject where id=@id');  
      
        return callBack(null,result)
        } catch (err) {
            return callBack(err)
        }
      }),

   
    updateSubject:(data,callBack)=>{
        pool.query(
            `update subject set name=?, medium=? where sub_id=?`,
            [
                data.name,
                data.medium,
                data.sub_id,
            ],
            (err,results,fields)=>{
                if(err){
                    return callBack(err)
                }
                return callBack(null,results.affectedRows)
            }

        )
    },

    deleteSubject:(data,callBack)=>{
       pool.query(
           `delete from subject where sub_id=?`,[data.sub_id],
           (err,results,fields)=>{
               if(err){
                  return callBack(err)
               }
               return callBack(null,results.affectedRows)
           }
       )
    },

    

}