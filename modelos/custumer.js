const mongoose=require('mongoose')
//esquema de base de datos

const customerSchema=mongoose.Schema({
    fistname:{ type:String},
    lastname:{type:String},
    phone:{ type:String},
    email:{type:String}
})
module.exports=mongoose.model('Customer',customerSchema)