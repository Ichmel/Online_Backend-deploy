import { db } from '../../../models';
const { Op } = require("sequelize");
import config from '../../../config';

export default {

    /* ......................Pour le Admin................................*/
    async addProduct(req, res, next) {
        console.log('ProduitGros', req.body)
        try {
            const { categoryId, typeId, categorieId, nomprod, prix,  qty, nomF,adresseF, contactF, localF, description,prixF } = req.body;
            db.ProduitsGros.findOne({
                where: { nomprod: nomprod }
            })
                .then(product => {
                    if (!product) {
                        return db.ProduitsGros.create({
                            categoryId: categoryId,
                            subCategoryId: typeId,
                            chilCategoryId: categorieId,
                            nomprod: nomprod,
                            prix: prix,
                            qty: qty,
                            prixF: prixF,
                            adresseF: adresseF,
                            nomF: nomF,
                            contactF: contactF,
                            localF: localF,
                            description: description,
                            photo: req.file ? req.file.location : '',
                        })
                    }
                    throw new RequestError('Already exist product', 409);
                })
                .then(product => {
                    res.status(200).json({ 'success': true, msg: "Successfully inserted product" });
                })

                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },


    async addMultiProduct(req, res, next) {
        console.log(req.body)
        try {
            const { productId, categoryId, subCategoryId, chilCategoryId, nomprod, prix,prixF, adresseF, qty, nomF, contactF, localF, description } = req.body;
            db.ProduitsGros.findOne({
                where: { id: productId }
            })
                .then(Produit => {
                    if (Produit) {
                        return db.ProduitsGros.create({
                            categoryId: categoryId ? categoryId : Produit.categoryId,
                            subCategoryId: subCategoryId ? subCategoryId : Produit.subCategoryId,
                            chilCategoryId: chilCategoryId ? chilCategoryId : Produit.chilCategoryId,
                            nomprod: nomprod,
                            prix: prix,
                            prixF: prixF,
                            qty: qty,
                            adresseF: adresseF,
                            nomF: nomF,
                            contactF: contactF,
                            localF: localF,
                            description: description,
                            photo: req.file ? req.file.location : Produit.photo,
                        }, { where: { id: Produit.id } })
                    }
                    throw new RequestError('Not Found Product', 409);
                })
                .then((p) => {
                    res.status(200).json({ 'success': true, msg: 'Updated Successfully' });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },



    async index(req, res, next) {
        try {
            // const { supplierId, categoryId, subCategoryId } = req.query
            db.ProduitsGros.findAll({
                order: [['createdAt', 'DESC']],
                include: [{
                    model: db.ChildCategory, attributes: ["id", 'name'],
                    include: [{
                        model: db.SubCategory, attributes: ["id", "name"],
                        include: [{
                            model: db.category, attributes: ["id", "name"]
                        }]
                    }]
                }]
            })
                .then(product => {
                    res.status(200).json({ 'success': true, product });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },



    async update(req, res, next) {
        console.log(req.body)
        try {
            const { productId, categoryId, subCategoryId, chilCategoryId, nomprod, prix,prixF, adresseF, qty, nomF, contactF, localF, description } = req.body;
            db.ProduitsGros.findOne({
                where: { id: productId }
            })
                .then(Produit => {
                    if (Produit) {
                        return db.ProduitsGros.update({
                            categoryId: categoryId ? categoryId : Produit.categoryId,
                            subCategoryId: subCategoryId ? subCategoryId : Produit.subCategoryId,
                            chilCategoryId: chilCategoryId ? chilCategoryId : Produit.chilCategoryId,
                            nomprod: nomprod,
                            prix: prix,
                            prixF: prixF,
                            qty: qty,
                            nomF: nomF,
                            adresseF: adresseF,
                            contactF: contactF,
                            localF: localF,
                            description: description,
                            photo: req.file ? req.file.location : Produit.photo,
                        }, { where: { id: Produit.id } })  
                    }
                    throw new RequestError('Not Found Product', 409);
                })
                .then((p) => {
                    res.status(200).json({ 'success': true, msg: 'Updated Successfully' });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    
    
    async getProductGrosListById(req, res, next) {
        try {
            db.ProduitsGros.findAll({
                where: { id: req.query.id },
                include: [{ model: db.productphotogros, attributes: ["id", "photo"] }],
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

    
       /*........................Ajoutet et recuperation   des donnees de productphoto................................*/

    async getAllPhoto(req, res, next) {
        try {
            db.ProduitsGros.findAll({
                order: [['createdAt', 'DESC']],
                attributes: ['id', 'nomprod', 'photo'],
                include: [{ model: db.productphotogros, attributes: ['id', 'photo', 'couleur', 'taille'], }]
            })
                .then(data => {
                    res.status(200).json({ 'success': true, data });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },


    async addPhoto(req, res, next) {
        console.log(req.file)
        try {
            const { productId, couleur, taille } = req.body;
            db.productphotogros.findOne({
                where: { photo: req.file.location }
            })

                .then(product => {
                    if (!product) {
                        return db.productphotogros.create({
                            productId: productId,
                            photo: req.file ? req.file.location : '',
                            couleur: couleur,
                            taille: taille,

                        })
                    }
                    throw new RequestError('Already exist product', 409);
                })
                .then(product => {
                    res.status(200).json({ 'success': true, msg: "Successfully inserted product" });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    
     /*........................Update   des donnees de productphoto................................*/
    
     async  productphotoUpdate(req, res, next) {
        console.log(req.body)
        try {
            const { id, couleur, taille } = req.body;
            db.productphotogros.findOne({
                where: { id: id }
            })
                .then(Produit => {
                    if (Produit) {
                        return db.productphotogros.update({
                            couleur: couleur,
                            taille: taille,
                            photo: req.file ? req.file.location : Produit.photo,
                        }, { where: { id: Produit.id } })
                    }
                    throw new RequestError('Not Found Product', 409);
                })
                .then((p) => {
                    res.status(200).json({ 'success': true, msg: 'Updated Successfully' });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    
    async getAllProduitLmite(req, res, next) {
        try {
           
            db.ProduitsGros.findAll({
                order: [['createdAt', 'DESC']], limit: 15,
                
            })
                .then(product => {
                    res.status(200).json({ 'success': true, product });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    


    async getAllProductgrosList(req, res, next) {
        try {
            // const { supplierId, categoryId, subCategoryId } = req.query
            db.ProduitsGros.findAll({
                order: [['createdAt', 'DESC']],
              
            })
                .then(product => {
                    res.status(200).json({ 'success': true, product });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },


    /* ......................Pour le Website................................*/


    async getAllProductList(req, res, next) {
        try {
            db.ProduitsGros.findAll({
                order: [['createdAt', 'DESC']],
                include: [{ model: db.SubCategory, attributes: ["id", "name"], include: [{ model: db.category, attributes: ["id", "slug"] }] }]
            })
                .then(product => {
                    res.status(200).json({ 'success': true, product });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },


    /* ......................Pour l affichage les detaille des produits................................*/

    async getWebProductListById(req, res, next) {
        try {
            db.ProduitsGros.findOne({
                where: { id: req.query.id },
                include: [{
                    model: db.productphotogros, attributes: ["id", "photo", "couleur", "taille"]
                }],

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

    /* ......................Pour le rechercher des produits par categorie ................................*/

    async getAllProductBySlug(req, res, next) {
        try {
            db.category.findOne({
                attributes: ["id", "name"],
                where: { name: req.params.name },
                include: [{ model: db.ProduitsGros, order: [['createdAt', 'DESC']], include: [{ model: db.productphotogros, attributes: ["id", "photo"] }] }]
            })
                .then(product => {
                    res.status(200).json({ 'success': true, data: product });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    /* ......................Pour le rechercher des produits dans la barre de rechercher ................................*/

    async getFilterbyProduct(req, res, next) {
        try {
            let search = '%%';
            if (req.query.search) {
                search = '%' + req.query.search + '%';
            }
            db.SubCategory.findAll({
                attributes: ['id', 'name'],
                include: [{
                    model: db.ProduitsGros, order: [['createdAt', 'DESC']], required: true, where: {
                        [Op.or]: [{ nomprod: { [Op.like]: search } }],
                    }
                }]
            })

                .then(product => {
                    res.status(200).json({ 'success': true, data: product });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },


    async getProductSubChildCat(req, res, next) {
        try {
            const { subCategoryId, chilCategoryId } = req.body;
            db.ProduitsGros.findAll({
                where: { chilCategoryId: chilCategoryId, subCategoryId: subCategoryId },
            })
                .then(product => {
                    res.status(200).json({ 'success': true, data: product });
                })
                .catch(function (err) {
                    next(err)
                });

        }
        catch (err) {
            next(err)
            // res.status(500).json({ 'success':false, msg: err})
        }
    },


    async getSimilarProductsByChild(req, res, next) {

        try {
            db.ProduitsGros.findAll({
                where: { chilCategoryId: req.query.chilCategoryId },
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


