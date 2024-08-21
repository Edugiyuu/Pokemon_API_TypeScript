import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

export const postEmail = async (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: "nomemailtest@gmail.com",
        to: to,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar e-mail:', error);
            return res.status(500).json({ error: error.toString() });
        }
        res.status(200).json({ message: 'E-mail enviado!', info });
    });
};
