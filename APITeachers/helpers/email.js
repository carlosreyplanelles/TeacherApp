// Nodemailer
const nodemaler = require("nodemailer");

//** Env Variables */
const {
    GMAIL_EMAIL = process.env.GMAIL_EMAIL,
    GMAIL_CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET,
    ADMINISTRADOR_EMAIL = process.env.ADMINISTRADOR_EMAIL,
} = process.env;

//** Email Functions Handlers */
async function sendMailAPiTeachers() {
    
    // Nodemailer TRANSPORT INFORMATION
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: GMAIL_EMAIL,
            pass: GMAIL_CLIENT_SECRET,
        },
    });

    // Body of Message
    let mailBody = `
        <div>
            <p>Hola! <b>administrador</b></p>
            <p>Un nuevo profesor ha sido dado de alta, vaya a  https://lalapolalaanewb.com para validarlo.</p>
        </div>
        <div>
            <p>Sincerely,</p>
            <p>System [<b>Lalapolalaa Newb</b>]</p>
        </div>    
    `;

    // Body of mail
    let mailOptions = {
        from: `Alertas TeacherAPP <${GMAIL_EMAIL}>`,
        to: ADMINISTRADOR_EMAIL,
        subject: "🚀 Nuevo profesor dado de alta",
        html: mailBody,
    };

    // Send email
    return await transporter.sendMail(mailOptions)
        .then(success => "Email enviado")
        .catch(error => "Email NO enviado");
}

module.exports = { sendMailAPiTeachers };
