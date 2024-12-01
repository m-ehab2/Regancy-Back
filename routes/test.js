const { Router } = require("express");


const router=Router()

router.get("/",(req,res)=>{
    return res.json({
      success: true,
      message: "succsee",
    })
  })

  module.exports=router