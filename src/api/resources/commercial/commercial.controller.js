import { db } from '../../../models';
import JWT from 'jsonwebtoken';
import mailer from '../../../mailer';
import config from '../../../config';
import bcrypt from 'bcrypt-nodejs';
import speakeasy from 'speakeasy';
import { validateEmail } from './../../../functions'
const jwt = require('jsonwebtoken');

export default {

    async addcommercial(req, res, next) {
        const { nom, phone, address, password, codeBonnus, orderId, custid, ordernumber } = req.body;
        console.log(req.body);
    
        var passwordHash = bcrypt.hashSync(password);
    
        try {
            const existingCommercial = await db.Commercial.findOne({
                where: {
                    [db.Sequelize.Op.or]: [{ ordernumber: ordernumber }, { nom: nom }]
                },
                paranoid: false
            });
    
            if (existingCommercial) {
                throw new RequestError('ordernumber or nom is already in use', 409);
            }
    
            const newCommercial = await db.Commercial.create({
                nom: nom,
                phone: phone,
                address: address,
                codeBonnus: codeBonnus,
                ordernumber: ordernumber,
                custid: custid,
                orderId: orderId,
                password: passwordHash
            });
    
            if (newCommercial) {
                return res.status(200).json({ success: true, msg: "Le commercial a été ajouté: " + nom + "." });
            } else {
                return res.status(500).json({ success: false });
            }
        } catch (err) {
            console.error(err);
            next(err);
        }
    },
    

    
    async login(req, res, next) {
        const { nom, password } = req.body;
        console.log(req.body)
        
        try {
            // Trouver l'utilisateur par email
            const user = await db.Commercial.findOne({ where: { nom: nom } });
    
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


        
    async valideBonnus(req, res, next) {
       
        const { codeBonnus } = req.body;
        console.log(req.body)
    
        try {
           
            const bonnus = await db.Commercial.findOne({ where: { codeBonnus:codeBonnus  } });
    
            if (!bonnus) {
                throw new RequestError('Invalid email or password', 401);
            }
    
            res.status(200).json({ success: true, msg: 'Bonnus successful' });
           
        } 
        catch (err) {
            console.error(err);
            next(err);
        }
       
    
        },


        async findCommercial(req,res,next){
            db.Commercial.findOne({    
                where: { nom: req.query.nom }, paranoid: false,
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


        
    async ListeBonnus(req,res,next){
        db.Order.findAll({ order: [['createdAt', 'DESC']],
            where: { codeBonnus : req.query.codeBonnus }, paranoid: false,
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

          
    async ListeCommLivre (req,res,next){
        db.Order.findAll({ order: [['createdAt', 'DESC']],
            where: { codeBonnus : req.query.codeBonnus ,  commission: 'nonpaye', status : 'Livre'  }, paranoid: false,
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

         
    async ListeCommission(req,res,next){
        db.Order.findAll({  order: [['createdAt', 'DESC']],
            where: { codeBonnus : req.query.codeBonnus ,  commission: 'nonpaye', }, paranoid: false,
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

    async getCommercialUpdate(req, res, next) {
        try {
            const{ id, nom , phone, adresse }= req.body.data;
            db.Commercial.findOne({ where: { id: id } })
            .then(Commercial => {
                if (Commercial) {
                    return db.Commercial.update({ 
                        nom: nom, adresse: adresse, phone: phone,
                     },{where: {id: Commercial.id}})
                }
                throw new RequestError('Commercial is not found')
            })
            .then(re => {
                return res.status(200).json({'msg':'success','status': "update Commercial Seccessfully" });
            }).catch(err => {
                next(err)
            })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    
    async deleteCommercial(req, res, next) {
        try {
            db.Commercial .findOne({ where: { id: parseInt(req.query.id) } })
            .then(commercial => {
                if (commercial) {
                    return db.Commercial.destroy({ where: { id: commercial.id } })
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

      
    async getAllCommercial(req,res,next){
        db.Commercial.findAll( {  order: [['createdAt', 'DESC']],})
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


      
    async getProductListById(req, res, next) {
        try {
            db.Commercial.findAll({
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