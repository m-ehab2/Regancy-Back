const Joi =require("joi")

 const signUpSchema = {
    body: Joi.object({
      userName:Joi.string().required().min(6).max(16).messages({
        'any.required':"please inter your userName ",
        "any.min":"user Name must be at lest 3 leater",
        "any.max":"user Name must be at moast 16 leater",
      }),
      email:Joi.string().email().required(),
      password:Joi.string().required(),
      rePassword:Joi.string().valid(Joi.ref("password")).required(),
      role:Joi.string().valid("user","admin")
     
    }),
   
    
  };
 const signinSchema = {
    body: Joi.object({
      
      email:Joi.string().email().required(),
      password:Joi.string().required(),
      
     
    }),
   
    
  };
  
  module.exports = {signUpSchema,signinSchema}