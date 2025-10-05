const express=require("express")
const jwt =require("jsonwebtoken")
const bcrypt=require("bcrypt")
const router=express.Router()
const jwt_secret="123456"
const {info} = require("./zod")
const {users} =require("./userdb")

// signup

router.post("/signup",async function(req,res){
    const {name,password}=req.body
    const parsepayload= info.safeParse({name,password})
    if(!parsepayload.success){
        return res.status(411).json({msge:"Invalid credential"})
    }

    try{
    const exist = await users.findOne({username:name})
    if(exist){
        return res.status(411).json({msge:"user already exist"})
    }
    const hashpass= await bcrypt.hash(password,10)
    const newuser=new users({
        username:name,
        password:hashpass
    })
    await newuser.save()

    //  generate token
    const token=jwt.sign({id:newuser._id},jwt_secret)
    return res.status(200).json({token})

    }catch(err){
       return  res.json({msge:"something wrong"+err})
    }
})


//  for signin
router.post("/signin",async function(req,res){
    const {name,password}= req.body
    const parsepayload=  info.safeParse({name,password})
    if(!parsepayload.success){
        return res.status(411).status({msge:"invalid credential"})
    }
    try{
        const exist = await users.findOne({username:name})
      if(!exist){
        return res.status(411).json({msge:"user does not exist"})
      }
      const match= await bcrypt.compare(password,exist.password)
      if(!match){
       return  res.status(411).json({msge:"wrong password"})
      }
      const token=jwt.sign({id:exist._id},jwt_secret)
      return res.status(200).json({token})

    }catch(err){
        return res.json({msge:"something went wrong"+err})
    }
})



// 

function middleware(req,res,next){
   const token=req.headers["authorization"]
   if(!token){
    return res.status(411).json({msge:"token not found"})
   }
   try{
    const decoded=jwt.verify(token.split(" ")[1],jwt_secret);
    req.userId=decoded.id
    next()
   }catch(err){
    return res.json({msge:"something went wrong"})
   }
}

module.exports ={router,middleware}