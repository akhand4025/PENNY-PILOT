const express =require("express")
const app=express();
const {router:signRouter,middleware}=require('./auth.js');
const cors=require("cors")
app.use(cors())
app.use(express.json())
app.use('/',signRouter);
const {expensedata} = require("./expensedb")
const {createexpense} = require("./zod")

//  adding the expenses
app.post("/add",middleware,async function(req,res){
const payload =req.body;
const parsepayload=createexpense.safeParse(payload);
if(!parsepayload.success){
  return  res.status(411).json({msge:"invalid input"})
}

await expensedata.create({
    title:payload.title,
    amount:payload.amount,
    date:new Date(payload.date),
    description:payload.description,
    userId:req.userId
})
return res.status(200).json({msge:"expensedata added"})

})


//  get the expense
app.get("/display",middleware,async function(req,res){
 const fetch= await expensedata.find();
 return res.json(fetch);

})


// update the expense
app.post("/update",middleware,async function(req,res){


})


//  delete the expense
app.delete("/remove",middleware,async function(req,res){


})

app.listen(3000);