import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'
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

export const postForgotPassword = async (req, res) => {
    const { to, subject, text } = req.body;
    const userExists = await User.findOne({email:to})

    if (!userExists) {
        return res.status(422).json({ msg: 'Esse Email não existe' });
      }

    try {
        const token = jwt.sign({ email: userExists.email, id:userExists._id }, process.env.SECRET, { expiresIn: '15m' });
        console.log(token);
        
        console.log(`http://localhost:3000/reset-password/${userExists._id}/${token}`);
        
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: to,
            subject: subject,
            text: `${text}\n\nToken de redefinição de senha: ${token}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erro ao enviar e-mail:', error);
                return res.status(500).json({ error: error.toString() });
            }
            console.log(info.response);

            res.status(200).json({ message: 'E-mail enviado!', info });
        });
    } catch (error) {
        console.error('Erro', error);
        res.status(500).json({ error: error.toString() });
    }
};

export const getResetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { newPassword } = req.body;

    try {
        //verifica se o token é válido
        const verify = jwt.verify(token, process.env.SECRET);

        // verifica se o ID do token corresponde ao usuário
        if (verify.id !== id) {
            return res.status(401).json({ error: 'Token não autorizado para este usuário.' });
        }
        
        const userExists = await User.findById(id);
        if (!userExists) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(newPassword, salt);

        userExists.password = passwordHash;
        await userExists.save();

        res.status(200).json({ message: 'Senha alterada com sucesso.' });

    } catch (error) {
        console.error('Erro ao redefinir a senha:', error);
        return res.status(400).json({ error: 'Token inválido ou expirado.' });
    }
};
