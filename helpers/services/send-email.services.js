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
        host:"https://shared-appolonia-regency-9272e2bf.koyeb.app",
        service:"gmail",
        port:465,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAIL_PASSWORD
        }
    })

    const info=await transporter.sendMail({
        from: `"Fred Foo 👻" <${process.env.EMAIL}>`, 
        to, 
        subject, 
        html: message, 
        attachments
    })
    return info.accepted.length ? true : false
} 
module.exports = sendEmailServices