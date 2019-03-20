const mongoose= require('mongoose')
//mapeo global
mongoose.Promise=global.Promise
//conectando base de datos
const db=mongoose.connect('mongodb://localhost:27017/customercli')
//inportando modelo 
const Customer=require('./modelos/custumer')

//agregando customer

const addCustomer=(customer)=>{
    Customer.create(customer).then(customer=>{
        console.log('custumer added')
        db.close()
    })
}
//primer cliente
const findCustomer=(name)=>{
    const search=new RegExp(name,'i')
    Customer.find({$or:[{firstname:search},{lastname:search}]}).then(customer=>{
        console.info(customer)
        console.info(`${customer.lenght} matches`)
        db.close()
    })
}
module.exports={
    addCustomer,
    findCustomer
}