import { db } from '../../../models';
import JWT from 'jsonwebtoken';
import mailer from '../../../mailer';
import config from '../../../config';
import bcrypt from 'bcrypt-nodejs';
import speakeasy from 'speakeasy';
import { validateEmail } from './../../../functions'

const nodemailer = require("nodemailer");

const jwt = require('jsonwebtoken');

var JWTSign = function (user, date) {
    return JWT.sign({
        iss: config.app.name,
        sub: user.id,
        iam : user.type,
        iat: date.getTime(),
        exp: new Date().setMinutes(date.getMinutes() + 30)
    }, config.app.secret);
}

function generateOtp() {
    let token = speakeasy.totp({
        secret: process.env.OTP_KEY,
        encoding: 'base32',
        step: (30 - Math.floor((new Date().getTime() / 1000.0 % 30)))
    });
    return token;
}

function verifyOtp(token) {
    let expiry = speakeasy.totp.verify({
        secret: process.env.OTP_KEY,
        encoding: 'base32',
        token: token,
        step: (30 - Math.floor((new Date().getTime() / 1000.0 % 30))),
        window: 0
    });
    return expiry
}


export default {
    async addUser(req, res, next) {
        const { firstName, lastName, phone, email, address, password } = req.body;
        console.log(req.body)

        var passwordHash = bcrypt.hashSync(password); 

        db.customer.findOne({ where: { email: email }, paranoid: false })
            .then(find => {
                if (find) {
                    throw new RequestError('Email is already in use', 409);
                }
                return db.customer.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    address: address,
                    password: passwordHash
                })

            })
            .then(user => {
                if (user) {
                  
                    return res.status(200).json({ success: true, msg: "New Registration added and password has been sent to " + email + " ." });
                }
                else
                    res.status(500).json({ 'success': false });
            })
            .catch(err => {
                console.log(err)
                next(err);
            })
    },

    async findUser(req, res, next) {
        try {
            const user = await db.customer.findOne({
                where: { email: req.query.email },
                order: [['createdAt', 'DESC']] , limit:5,
                include: [ {
                        model: db.Order,
                        include: [{ model: db.Address , attributes: ["id", "dateL"] }],
                        // Tri par ordre décroissant
                    }
                ],
            });
    
            if (user) {
                return res.status(200).json({ success: true, data: user });
            } else {
                return res.status(500).json({ success: false });
            }
        } catch (err) {
            console.error(err);
            next(err);
        }
    },
    
    
    
    

    async login(req, res, next) {
    const { email, password } = req.body;
    console.log(req.body)
    
    try {
        // Trouver l'utilisateur par email
        const user = await db.customer.findOne({ where: { email: email } });

        if (!user) {
            throw new RequestError('Invalid email or password', 401);
        }

        // Comparer le mot de passe fourni avec le mot de passe haché dans la base de données
      
        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            throw new RequestError('Invalid email or password', 401);
        }

        // Générer un token JWT pour l'utilisateur authentifié
        const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

        // Envoyer le token dans la réponse
        res.status(200).json({ success: true, token: token, msg: 'Login successful' });
       
    } 
    catch (err) {
        console.error(err);
        next(err);
    }

    },

    addRegister: async (req, res, next) => {
        const { firstName, lastName, phone, email, address, password } = req.body;
        console.log('inscritp',req.body)
        try {
            // Vérifier si l'e-mail existe déjà
            const existingUser = await db.customer.findOne({ where: { email: email }, paranoid: false });
    
            if (existingUser) {
                throw new RequestError('L\'adresse e-mail est déjà utilisée', 409);
            }
    
            // Autres validations d'e-mail peuvent être ajoutées ici, par exemple :
            if (!validateEmail(email)) {
                throw new RequestError('L\'adresse e-mail fournie n\'est pas valide', 400);
            }
    
            // Hash du mot de passe
            const passwordHash = bcrypt.hashSync(password);
    
            // Création du nouvel utilisateur
            const newUser = await db.customer.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                address: address,
                password: passwordHash
            });
    
            if (newUser) {
                // Envoi de l'e-mail de confirmation
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
                });
    
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Inscription réussie",
                    html: '<h1>Félicitations !</h1><p>Vous  êtes inscrit avec succès sur notre plateforme.</p>'
                };

                const token = jwt.sign({ userId: newUser.id }, 'your-secret-key', { expiresIn: '1h' });
    
                try {
                    const infoEmail = await transporter.sendMail(mailOptions);
                    return res.status(200).json({
                        success: true,
                        msg: `Nouvelle inscription ajoutée et email de confirmation envoyé à ${email}.`,
                        infoEmail: infoEmail,
                        token: token
                    });
                } catch (emailError) {
                    // Si l'envoi de l'e-mail échoue, supprimer le compte créé
                    await db.customer.destroy({ where: { email: email } });
                    throw new RequestError('Erreur lors de l\'envoi de l\'e-mail de confirmation', 500);
                }
            } else {
                res.status(500).json({ success: false });
            }
        } catch (err) {
            console.log("Erreur lors de l'inscription : ", err);
            next(err);
        }
    },
   

    rootPassword: async (req, res) => {
        const generateRandomPassword = () => {
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            const passwordLength = 8; // You can adjust the password length according to your needs
            let password = "";
        
            for (let i = 0; i < passwordLength; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset.charAt(randomIndex);
            }
        
            return password;
        };
        
        try {
            // Validation de l'adresse e-mail
            if (validateEmail(req.body.email)) {
                // Recherche de l'utilisateur par son adresse e-mail
                const user = await db.customer.findOne({
                    where: {
                        email: req.body.email
                    }
                });
    
                if (user) {
                    // Génération d'un nouveau mot de passe (assurez-vous que 'password' est correctement défini)
                    const nouveauMotDePasse = generateRandomPassword(); // Remplacez cela par la logique réelle de génération de mot de passe
                   
                    console.log('nouveau',nouveauMotDePasse)
                    const motDePasseHashe = bcrypt.hashSync(nouveauMotDePasse);
                    // Mise à jour du mot de passe de l'utilisateur

                     await db.customer.update(
                        { password: motDePasseHashe },
                        { where: { email: req.body.email } }
                    );
    
                    // Hachage du nouveau mot de passe
                    // Utilisez un sel approprié (10 est le nombre de tours de hachage)
    
                    // Envoi du nouveau mot de passe par e-mail
                    const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: process.env.EMAIL,
                            pass: process.env.PASSWORD
                        }
                    });
    
                    const mailOptions = {
                        from: process.env.EMAIL,
                        to: req.body.email,
                        subject: "Réinitialisation du mot de passe",
                        html: `<h1>Réinitialisation du mot de passe</h1>
                               <p>Votre nouveau mot de passe est : ${nouveauMotDePasse}</p>`
                    };
    
                    try {
                        // Envoi de l'e-mail
                        const infoEmail = await transporter.sendMail(mailOptions);
                        return res.status(200).json({
                            success: true,
                            msg: "Nouveau mot de passe envoyé à l'adresse e-mail associée au compte.",
                            infoEmail: infoEmail
                        });
                    } catch (emailError) {
                        throw new RequestError("Erreur lors de l'envoi du nouveau mot de passe par e-mail", 500);
                    }
                } else {
                    // Aucun utilisateur trouvé avec cette adresse e-mail
                    return res.status(401).json({
                        success: false,
                        redirect: false,
                        msg: "Les informations concernant ce compte de connexion n'existent pas. Réessayez ou créez un nouveau compte."
                    });
                }
            }
        } catch (err) {
            console.error("Erreur lors de la récupération du mot de passe : ", err);
            res.status(err.status || 500).json({ success: false, msg: err.message });
        }
    },
    
  
    
    
    
   
   

    async sendReset(req, res) {
        const { email } = req.body;
        mailer.sendResetPassword(email)
            .then(r => {
                return res.status(200).json({ success: true });
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({ errors: ['Error Sending Email!'] });
            });
    },

    async resetPassword(req, res) {
        const { email, verificationCode, password } = req.body;
        db.customer.findOne({
            where: { email: email, verf_key: verificationCode }
        })
            .then(result => {
                if (result) {
                    var hash = bcrypt.hashSync(password);
                    db.customer.update({ password: hash, verf_key: null, attempt: 0 ,isVerify: 1}, { where: { email: email } });
                    return res.status(200).json({ success: true });
                } else {
                    return res.status(500).json({ errors: ['Invalid verification code!'] });
                }
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({ errors: ['Error Updating Password!'] });
            })

    },
    
    async getAllCustomer(req,res,next){
        db.customer.findAll( {  order: [['createdAt', 'DESC']],})
        .then(user => {
            if (user) {
                return res.status(200).json({ success: true, data:user});
            }
            else
                res.status(500).json({ 'success': false });
        })
        .catch(err => {
            console.log(err)
            next(err);
        })
    },
  
      
         
    async deleteCustomer(req, res, next) {
        try {
            db.customer.findOne({ where: { id: parseInt(req.query.id) } })
            .then(customer => {
                if (customer) {
                    return db.customer.destroy({ where: { id: customer.id } })
                }
                throw new RequestError('Customer is not found')
            })
            .then(re => {
                return res.status(200).json({'msg':'success','status': "deleted Customer Seccessfully" });
            }).catch(err => {
                next(err)
            })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    //Api customer update 
    async getCustomerUpdate(req, res, next) {
        try {
            const{ id, firstName, lastName, phone, gender , password }= req.body.data;

            const passwordHash = bcrypt.hashSync(password);
            db.customer.findOne({ where: { id: id } })
            .then(customer => {
                if (customer) {
                    return db.customer.update({ 
                        firstName: firstName, lastName: lastName, phone: phone, gender: gender
                        ,password :passwordHash
                     },{where: {id: customer.id}})
                }
                throw new RequestError('Customer is not found')
            })
            .then(re => {
                return res.status(200).json({'msg':'success','status': "update Customer Seccessfully" });
            }).catch(err => {
                next(err)
            })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    
    async Messagecust(req, res, next) {
        console.log(req.body)
        const { message , email  } = req.body;
        db.MessageCustomer.findAll({ where: { email : email } })
            .then(data => {
                
                return db.MessageCustomer.create({ message : message  , email : email })
            })
            .then(category => {
                res.status(200).json({ 'success': true, msg: "Successfully send message" });
            })
            .catch(function (err) {
                next(err)
            });
    },

      
    async Messageadmin(req, res, next) {
        console.log(req.body)
        const { message,  email  } = req.body;
        db.MessageAdmin.findAll({ where: { email : email } })
            .then(data => {

                return db.MessageAdmin.create({ message : message , email : email })
            })
            .then(category => {
                res.status(200).json({ 'success': true, msg: "Successfully send message" });
            })
            .catch(function (err) {
                next(err)
            });
    },
    
     
    async findMessgCustomer(req,res,next){
        db.MessageCustomer.findAll({ 
            where: { email: req.query.email }, paranoid: false,
         })
        .then(user => {
            if (user) {
                return res.status(200).json({ success: true, data:user});
            }
            else
                res.status(500).json({ 'success': false });
        })
        .catch(err => {
            console.log(err)
            next(err);
        })
    },

    
    async findMessgAdmin(req,res,next){
        db.MessageAdmin.findAll({ 
            where: { email: req.query.email }, paranoid: false,
           
         })
        .then(user => {
            if (user) {
                return res.status(200).json({ success: true, data:user});
            }
            else
                res.status(500).json({ 'success': false });
        })
        .catch(err => {
            console.log(err)
            next(err);
        })
    },

      
    async MessageProduit(req, res, next) {
        console.log(req.body)
        const { photo, nomprod, email, productId , qty  ,prix , prixF , nomF, contactF , localF  } = req.body;
        db.MessageProduit.findAll({ where: { email: email } })
            .then(data => {            
                return db.MessageProduit.create({   photo: photo, nomprod :nomprod , email :email, productId :productId ,
                qty:qty, prix :prix, prixF: prixF , contactF: contactF, nomF:nomF , localF: localF })
            })
            .then(category => {
                res.status(200).json({ 'success': true, msg: "Successfully send message" });
            })
            .catch(function (err) {
                next(err)
            });
    },
    
    async MessageListProd(req, res, next) {
        db.MessageProduit.findAll({ 
            where: { email: req.query.email }, paranoid: false,
            order: [['createdAt', 'DESC']],
           

         })
        .then(user => {
            if (user) {
                return res.status(200).json({ success: true, data:user});
            }
            else
                res.status(500).json({ 'success': false });
        })
        .catch(err => {
            console.log(err)
            next(err);
        })
    },
    

    
    async getAllCustomerMessge(req, res, next) {
        try {
          const usersWithMessages = await db.customer.findAll({
            where: db.sequelize.literal(
              'email IN (SELECT DISTINCT email FROM MessageCustomers)'
            ),
          });
      
          if (usersWithMessages) {
            return res.status(200).json({ success: true, data: usersWithMessages });
          } else {
            res.status(500).json({ success: false, message: 'Aucun utilisateur trouvé avec des messages associés.' });
          }
        } catch (err) {
          console.log(err);
          next(err);
        }
      },
  

       
    async getCustomerListById(req, res, next) {
        try {
            db.customer.findAll({
                where: { id: req.query.id },
            
                order: [['createdAt', 'DESC']],
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
}




