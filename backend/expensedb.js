const mongoose =require("mongoose")
mongoose.connect("mongodb+srv://akhand4025_db_user:AhGqek4wwoBPBQgo@cluster0.94ciyj1.mongodb.net/expenses")
const expenseSchema=mongoose.Schema({
    title:String,
    amount:Number,
    date:Date,
    description:String,
     userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            required:true
        }
})

const expensedata=mongoose.model("expensedata",expenseSchema)
module.exports={expensedata}