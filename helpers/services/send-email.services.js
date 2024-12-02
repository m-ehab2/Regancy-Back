//send email


const nodemailer = require("nodemailer");

const sendEmailServices = async(
    {
        to='',
        subject='no-reply',
        message="<h3>no message</h3>",
        attachments=[]
    }
)=>{
    //email configration

    const transporter= nodemailer.createTransport({
        host:"https://app.koyeb.com",
        service:"gmail",
        port:465,
        auth:{
            user:"m7amedezz1122@gmail.com",
            pass:"rhxdlgdawmfaepve"
        }
    })

    const info=await transporter.sendMail({
        from: `"Fred Foo 👻" <m7amedezz1122@gmail.com>`, 
        to, 
        subject, 
        html: message, 
        attachments
    })
    console.log(info);
    
    return info.accepted.length ? true : false
} 
module.exports = sendEmailServices