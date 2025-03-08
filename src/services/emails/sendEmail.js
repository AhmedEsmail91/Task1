import nodemailer from "nodemailer";

export const sendEmail =async(sendToEmail,products)=>{
    

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const info = await transporter.sendMail({
        from: `"${process.env.APP_NAME} "<${process.env.EMAIL_NAME}>`,
        to: sendToEmail.email,
        subject: "Hello",
        html: orderEmail(sendEmail.name, products)
    });
    console.log("Message sent: %s", info.messageId);
};