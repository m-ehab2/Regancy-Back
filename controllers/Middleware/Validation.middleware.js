
const reqKeys=['body',"query",'params','headers']


 const validationMiddleware= (schema)=>{
    return (req,res,next)=>{

        let validationErrors=[]

        for (const key of reqKeys) {
            const validationDetails = schema[key]?.validate(req[key])

            if(validationDetails?.error){
                validationErrors.push(...validationDetails.error.details)
            }
            
            
            
        }
        
        if(validationErrors.length){
            const errorsMessage= validationErrors.map(ele=>ele.message)
            res.status(400).json({
                message:" Validation Error",
                error:errorsMessage
            })
        }
        next()



    }
}
module.exports= {validationMiddleware}