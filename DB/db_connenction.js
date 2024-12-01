const mongoose = require("mongoose");


  const db_connection = async ()=>{

    await mongoose.connect(process.env.CONNECTION_URL_HOST)
    .then((res)=>(console.log('db connented success ....')))
    .catch((error)=>(console.log('db connected failed',error)))
    
    
    }
    
    module.exports = {db_connection};
