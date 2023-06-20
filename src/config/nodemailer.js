// Importar el modulo
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
// Configuraciones del seridor smtp
const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP
    }
})


// send mail with defined transport object
// Definir la estructura del correo electronico
module.exports.sendMailToUser = async(userMail,token)=>{
    console.log(token);
    // El cuerpo del mail
    let info = await transporter.sendMail({
    // De
    from: 'admin@esfot.com',
    // Para
    to: userMail,
    // Asunto
    subject: "Verifica tu cuenta de correo electrónico",
    // Cuerpo mail
    html: `<a href="http://localhost:3000/user/confirmar/${token}">Clic para confirmar tu cuenta</a>`,
    });
    // Verifica en consola
    console.log("Message sent: %s", info.messageId);
}