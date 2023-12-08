import { db } from '../../../models';
var Sequelize = require("sequelize");


const nodemailer = require('nodemailer');

export default {

    /* Add user api start here................................*/
    async index(req, res, next) {
        try {
            const { customerId, paymentmethod, orderId,customerEmail, deliveryAddress, products, TotalCart ,
              express, TotalReduction, GrandTotal, TotalLivraison,TotalLivRed ,Reduction , codeBonnus, localite , prixlocalite , km } = req.body;
    
            console.log(req.body)
            const customer = await db.customer.findOne({ where: { id: customerId } });
    
            if (!customer) {
                return res.status(500).json({ 'errors': ['User is not found'] });
            }
    
            const order = await db.Order.create({
                custId: customerId,
                custEmail : customerEmail,
                number: orderId,
                Reduction: Reduction,
                TotalCart: TotalCart,
                TotalLivraison: TotalLivraison,
                GrandTotal : GrandTotal,
                TotalLivRed : TotalLivRed ,
                TotalReduction : TotalReduction,
                paymentmethod: paymentmethod,
                codeBonnus : codeBonnus,
                localite : localite,
                prixlocalite : prixlocalite,
                km : km, 
                express : express
            });
    
            const address = await db.Address.create({
                orderId: order.id,
                custId: customerId,
                nomCom: deliveryAddress ? deliveryAddress.name : '',
                phone: deliveryAddress ? deliveryAddress.phone : '',
                ville: deliveryAddress ? deliveryAddress.ville : '',
                quartier: deliveryAddress ? deliveryAddress.quartier : '',
                dateL: deliveryAddress ? deliveryAddress.dateL : '',
                timeL: deliveryAddress ? deliveryAddress.timeL : '',
                 googlemap: deliveryAddress ? deliveryAddress.googlemap : '',
            });
    
            let grandTotal = 0;
    
            const cartEntries = products.map((item) => {
                const productPhotos = JSON.parse(item.productphotos);
                const total = item.prix * item.qty;
    
                return {
                    orderId: order.id,
                    addressId: address.id,
                    productId: item.id,
                    name: item.nomprod,
                    qty: item.qty,
                    price: item.prix,
                    prixF: item.prixF,
                    nomF: item.nomF,
                    total: total,
                    adresseF : item.adresseF,
                    contactF: item.contactF,
                    localF: item.localF,
                    photo: productPhotos.photo || '', 
                    taille: productPhotos.taille ? productPhotos.taille.join(', ') : 'Non définie',
                    couleur: productPhotos.couleur ? productPhotos.couleur.join(', ') : 'Non définie',
                };
            });
    
            await db.Cart.bulkCreate(cartEntries);
            await order.update({ grandtotal: grandTotal });

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });

            const mailOptions = {
                from: process.env.EMAIL,
                to: [customerEmail, process.env.EMAIL],
                subject:  "Commande ",
                html: '<p> Votre Commande a été enregistre</p>',
               
            };
            try {
                const infoEmail = await transporter.sendMail(mailOptions);
                return res.status(200).json({
                    success: true,
                    msg: `Nouvelle commande a été enregistre ${customerEmail}.`,
                    infoEmail: infoEmail,
                    
                   
                });
            } catch (emailError) {
                console.error('Erreur lors de l\'envoi de l\'e-mail :', emailError);
                res.status(500).json({ 'errors': ['Erreur lors de l\'envoi de l\'e-mail de confirmation'] });
                return; // Ajout pour arrêter l'exécution du reste du code en cas d'erreur d'envoi d'e-mail
            }
    
           
        } catch (err) {
            console.error(err);
            res.status(500).json({ 'errors': ['Error adding cart'] });
        }
    },
    

    async getAllOrderList(req, res, next) {
        let limit = 10;
        let sort = ['createdAt', 'DESC'];
        let offset = 0;
        let page = 1;
        if(req.query.limit != undefined){
            limit = parseInt(req.query.limit);
        }
        if(req.query.page != undefined){
            page = req.query.page;
            if(page < 1)
                page = 1;
        }
        if(req.query.sort){
            if(req.query.sort == 'name'){
                sort = ['name'];
            }
        }
        try {
            
            db.Order.findAll({
                where: { custId: req.query.custId },
                order: [['createdAt', 'DESC']],
                
            })
                .then(list => {
                    res.status(200).json({ 'success': true, order: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },


    
    async getAllOrderLis (req, res, next) {
        let limit = 10;
        let sort = ['createdAt', 'DESC'];
        let offset = 0;
        let page = 1;
        if(req.query.limit != undefined){
            limit = parseInt(req.query.limit);
        }
        if(req.query.page != undefined){
            page = req.query.page;
            if(page < 1)
                page = 1;
        }
        if(req.query.sort){
            if(req.query.sort == 'name'){
                sort = ['name'];
            }
        }
        try {
            
            db.Order.findAll({
                order: [['createdAt', 'DESC']],
                include: [{ model: db.Address }, { model: db.Cart }],
            })
                .then(list => {
                    res.status(200).json({ 'success': true, order: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },


    async statusUpdate(req, res, next) {
        try {
            const { id, status, deliverydate } = req.body;
            db.Order.findOne({ where: { id: id } })
                .then(list => {
                    return db.Order.update({
                        status: status,
                        deliverydate: deliverydate ? deliverydate : list.deliverydate
                    }, { where: { id: id } })
                })
                .then((success) => {
                    res.status(200).json({ 'success': true, msg: "Successfully Updated Status" });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },


    async commissionUpdate(req, res, next) {
        try {
            const { id, commission } = req.body;
            console.log(req.body)
            db.Order.findOne({ where: { id: id } })
                .then(list => {
                    return db.Order.update({
                        commission: commission,
                       
                    }, { where: { id: id } })
                })
                .then((success) => {
                    res.status(200).json({ 'success': true, msg: "Successfully Updated Status" });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },


    async getAllOrderListById(req, res, next) {
        try {
            db.Order.findAll({
                where: { custId: req.body.id },
                order: [['createdAt', 'DESC']],
                include: [{ model: db.Address, include: [{ model: db.Cart }] }],
            })
                .then(list => {
                    res.status(200).json({ 'success': true, order: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },

    async getAllOrderStatus(req, res, next) {
        try {
            db.Order.findAll({
                where: { status: req.body.status },
                order: [['createdAt', 'DESC']],
                include: [{ model: db.Address, include: [{ model: db.Cart }] }],
            })
                .then(list => {
                    res.status(200).json({ 'success': true, order: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },
    
    async getAllOrderCount(req, res, next) {
        try {
            db.Order.findAll({
                attributes: ['status', [Sequelize.fn('COUNT', Sequelize.col('status')), 'total']],
                group: ['status']
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },

    async getaddresslist(req, res, next) {
        try {
            // const { supplierId, categoryId, subCategoryId } = req.query
            db.Address.findAll({
                order: [['createdAt', 'DESC']],
                include: [{ model: db.Order, include: [{ model: db.customer  }] }]
            })
                .then(order => {
                    res.status(200).json({ 'success': true, order });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },


    
    async getcartlist(req, res, next) {
        try {
            // const { supplierId, categoryId, subCategoryId } = req.query
            db.Address.findAll({
                order: [['createdAt', 'DESC']], 
                attributes: ["id", "nomCom",'phone'],
                include: [{ model: db.Cart  }]
            })
                .then(order => {
                    res.status(200).json({ 'success': true, order });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },


    
    async getOrderProduitId(req, res, next) {
        try {
            db.Order.findOne({
                where: { id: req.query.id },  
                order: [['createdAt', 'DESC']],        
                include: [{ model: db.Cart
             }], 
               
               
            })
                .then(order => {
                    res.status(200).json({ 'success': true, data: order });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },


    
    async getAllOrder(req,res,next){
        db.Order.findAll( {  order: [['createdAt', 'DESC']], 
        include: [{ model: db.Address }], })
        .then(order => {
            if (order) {
                return res.status(200).json({ success: true, order});
            }
            else
                res.status(500).json({ 'success': false });
        })
        .catch(err => {
            console.log(err)
            next(err);
        })
    },

   
    
    

}


