require("dotenv").config();
const express=require('express');
const app=express();
const userRouter=require('./api/user/user.router')
const subjectRouter=require('./api/subject/subject.router')

app.use(express.json());

app.use('/api/user',userRouter); 
app.use('/api/subject',subjectRouter)

app.listen(process.env.APP_PORT,()=>{
console.log("Server is running on port: ",process.env.APP_PORT)
})