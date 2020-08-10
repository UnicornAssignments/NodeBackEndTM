const {
addSubject,   
getAllSubjects,
getSubjectById,
deleteSubject,
updateSubject
}=require('./subject.service')

module.exports={


    addSubject:(req,res)=>{
        const body=req.body
        console.log(body);
            addSubject(body,(err,results)=>{
                 if(err){
                     console.log(err);
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
           
    }  ,  
     
    getAllSubjects:(req,res)=>{
           
         getAllSubjects((err,results)=>{
               if(err){
                   return res.status(500).json({
                       success:0,
                       msg:"Internal server error(In database)",
                       sqlMessage:err.sqlMessage
                   })
               }

               //*** make new subject object without subject id */ not necessary only for leaning
            //    const newSubject=(a)=>{
            //       return {
            //          name:a.name,
            //          medium:a.medium 
            //       }
            //    }
            //    const subject=results.map(a=>newSubject(a))
               //console.log(subject)
               return res.json({
                   success:1,
                   data:results
                  // data:subject
               })
            
         })
         

        },


    getSubjectById:(req,res)=>{
            const id=req.params.id
            console.log("Work");
            getSubjectById(id,(err,results)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success:0,
                        msg:"Internal server error(In database)",
                        sqlMessage:err.sqlMessage
                    })
                }
                console.log(results)
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
        
        updateSubject:(req,res)=>{
            const body=req.body;
            
    
            updateSubject(body,(err,results)=>{
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
    
    deleteSubject:(req,res)=>{
        const body=req.body
        //console.log(body)
        deleteSubject(body,(err,results)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:0,
                    msg:'Database  error'
                })
            }
            console.log(results)
               if(!results){
                   return res.json({
                       success:0,
                       msg:'Record not found'
                   })
               } 

               return res.json({
                   success:1,
                   data:results,
                   msg:'subject deleted successfully'
               })

        })

    }    
   
   
        



}