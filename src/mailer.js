import nodemailer from 'nodemailer';
import config from './config';
import { db } from './models';

export default {
    sendEmployeePassword: (email, otp) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await db.customer.findOne({ where: { email } });

                if (user) {
                    const smtpTransport = nodemailer.createTransport({
                        host: process.env.MAIL_HOST,
                        port: process.env.MAIL_PORT,
                        auth: {
                            user: process.env.MAIL_USERNAME,
                            pass: process.env.MAIL_PASSWORD
                        },
                        tls: { rejectUnauthorized: false },
                    });

                    smtpTransport.sendMail({
                        from: process.env.MAIL_FROM,
                        to: email,
                        subject: 'Site de l ecommerce',
                        html: `Cher,<br><br>Merci de votre inscription sur Nova maket.<br> <br> <b>${otp}</b><br> <br> Ce lien expirera dans 30 secondes. <br> Il s'agit d'un courrier généré par le système. Veuillez ne pas répondre à cet identifiant de courrier électronique.<br>Cordialements,<br> Service client<br>Nova`,
                    }, (error, info) => {
                        if (error) {
                            reject({
                                name: "NovaException",
                                msg: "Échec de l'envoi de l'e-mail"
                            });
                        } else {
                            resolve(true);
                        }
                    });
                } else {
                    reject({
                        name: "NovaException",
                        msg: "L'e-mail envoyé n'est pas disponible"
                    });
                }
            } catch (err) {
                reject(err);
            }
        });
    }
}
