import { db } from '../../../models';
var Sequelize = require("sequelize");
export default {

    /* Add user api start here................................*/
    async index(req, res, next) {
        try {
            const { customerId, paymentmethod, orderId, deliveryAddress, products } = req.body;
    
            const customer = await db.customer.findOne({ where: { id: customerId } });
    
            if (!customer) {
                return res.status(500).json({ 'errors': ['User is not found'] });
            }
    
            const order = await db.Order.create({
                custId: customerId,
                number: orderId,
                grandtotal: 0, // You might want to calculate this based on products
                paymentmethod: paymentmethod
            });
    
            const address = await db.Address.create({
                orderId: order.id,
                custId: customerId,
                nomCom: deliveryAddress ? deliveryAddress.name : '',
                phone: deliveryAddress ? deliveryAddress.phone : '',
                ville: deliveryAddress ? deliveryAddress.ville : '',
                quartier: deliveryAddress ? deliveryAddress.quartier : '',
                adresse: deliveryAddress ? deliveryAddress.address : '',
            });
    
            let grandTotal = 0;
    
            const cartEntries = products.map((item) => {
                const productPhotos = JSON.parse(item.productphotos);
                const total = item.qty * item.prix;
                grandTotal += total;
    
                return {
                    orderId: order.id,
                    addressId: address.id,
                    productId: item.id,
                    name: item.nomprod,
                    qty: item.qty,
                    price: item.prix,
                    total: total,
                    photo: productPhotos.photo || '', 
                    taille: productPhotos.taille ? productPhotos.taille.join(', ') : 'Non définie',
                    couleur: productPhotos.couleur ? productPhotos.couleur.join(', ') : 'Non définie',
                };
            });
    
            await db.Cart.bulkCreate(cartEntries);
            await order.update({ grandtotal: grandTotal });
    
            res.status(200).json({ 'success': true });
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
                include: [{ model: db.Order, attributes: ['id','grandtotal', 'deliverydate'], include: [{ model: db.customer , attributes: ["id", "firstName"] }] }]
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
                include: [{ model: db.Cart, attributes: ['id','name', 'price', 'qty','taille','couleur', 'photo']}]
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
                include: [{ model: db.Cart, attributes: ["id", "photo","name","price","qty" ,"total", "couleur","taille"] 
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


}


