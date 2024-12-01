const mongoose = require("mongoose");


  const db_connection = async ()=>{

    await mongoose.connect("mongodb+srv://regency:regency109@cluster0.vxyflva.mongodb.net/regency")
    .then((res)=>(console.log('db connented success ....')))
    .catch((error)=>(console.log('db connected failed',error)))
    
    
    }
    
    module.exports = {db_connection};
