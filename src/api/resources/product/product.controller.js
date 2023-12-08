import { db } from '../../../models';
const { Op } = require("sequelize");





export default {

    /* ......................Pour le Admin................................*/
    async addProduct(req, res, next) {
        console.log(req.body)
        console.log(req.file)
        try {
            const { categoryId, typeId, categorieId, nomprod,prixF, prix, ancienprix, qty, nomF,adresseF, contactF, localF, description, engros } = req.body;
            db.Produit.findOne({
                where: { nomprod: nomprod }
            })
                .then(product => {
                    if (!product) {
                        return db.Produit.create({
                            categoryId: categoryId,
                            subCategoryId: typeId,
                            chilCategoryId: categorieId,
                            nomprod: nomprod,
                            prix: prix,
                            qty: qty,
                            ancienprix: ancienprix,
                            nomF: nomF,
                            prixF: prixF,
                            adresseF:adresseF,
                            contactF: contactF,
                            localF: localF,
                            description: description,
                            engros: parseInt(engros) ? 'oui' : 'non',
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
        console.log(req.file)
        try {
            const { productId, prixF, categoryId, subCategoryId, chilCategoryId, nomprod,adresseF, prix, ancienprix, qty, nomF, contactF, localF, description, engros } = req.body;
            db.Produit.findOne({
                where: { id: productId }
            })
                .then(Produit => {
                    if (Produit) {
                        return db.Produit.create({
                            categoryId: categoryId ? categoryId : Produit.categoryId,
                            subCategoryId: subCategoryId ? subCategoryId : Produit.subCategoryId,
                            chilCategoryId: chilCategoryId ? chilCategoryId : Produit.chilCategoryId,
                            nomprod: nomprod,
                            prix: prix,
                            qty: qty,
                            ancienprix: ancienprix,
                            nomF: nomF,
                            prixF: prixF,
                            contactF: contactF,
                            localF: localF,
                            adresseF:adresseF,
                            description: description,
                            engros: parseInt(engros) ? 'oui' : 'non',
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
            db.Produit.findAll({
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


    //update categorie

    async update(req, res, next) {
        console.log(req.body)
        try {
            const { productId, categoryId, subCategoryId, chilCategoryId,prixF ,adresseF,nomprod, prix, ancienprix, qty, nomF, contactF, localF, description, engros } = req.body;
            db.Produit.findOne({
                where: { id: productId }
            })
                .then(Produit => {
                    if (Produit) {
                        return db.Produit.update({
                            categoryId: categoryId ? categoryId : Produit.categoryId,
                            subCategoryId: subCategoryId ? subCategoryId : Produit.subCategoryId,
                            chilCategoryId: chilCategoryId ? chilCategoryId : Produit.chilCategoryId,
                            nomprod: nomprod,
                            prix: prix,
                            qty: qty,
                            ancienprix: ancienprix,
                            nomF: nomF,
                            contactF: contactF,
                            localF: localF,
                            prixF: prixF,
                            adresseF:adresseF,
                            description: description,
                            engros: parseInt(engros) ? 'oui' : 'non',
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





    /*........................Update   des donnees de Categorie................................*/

    async MainCategoryUpdate(req, res, next) {
        console.log(req.body)
        try {
            const { id, name, slug } = req.body;
            db.category.findOne({
                where: { id: id }
            })
                .then(Produit => {
                    if (Produit) {
                        return db.category.update({
                            name: name,
                            slug: slug,
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



    /*........................Ajoutet et recuperation   des donnees de productphoto................................*/

    async getAllPhoto(req, res, next) {
        try {
            db.Produit.findAll({
                order: [['createdAt', 'DESC']],
                attributes: ['id', 'nomprod', 'photo'],
                include: [{ model: db.productphoto, attributes: ['id', 'photo', 'couleur', 'taille'], }]
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



    
    async getProductListById(req, res, next) {
        try {
            db.Produit.findAll({
                where: { id: req.query.id },
                include: [{ model: db.productphoto, attributes: ["id", "photo"] }],
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




    async addPhoto(req, res, next) {
        console.log(req.file)
        try {
            const { productId, couleur, taille } = req.body;
            db.productphoto.findOne({
                where: { photo: req.file.location }
            })

                .then(product => {
                    if (!product) {
                        return db.productphoto.create({
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

    async productphotoUpdate(req, res, next) {
        console.log(req.body)
        console.log(req.file)
        try {
            const { id, couleur, taille } = req.body;
            db.productphoto.findOne({
                where: { id: id }
            })
                .then(Produit => {
                    if (Produit) {
                        return db.productphoto.update({
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




    async getAllGrocerryStaples(req, res, next) {
        try {
           
            db.Produit.findAll({
                where: {
                    engros: 'non'
                },
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


    async getMeilleVente(req, res, next) {
        try {
           
            db.Produit.findAll({
                where: {
                    engros: 'oui'
                },
            
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
    
    

    /* ......................Pour le Website................................*/


    async getAllProductList(req, res, next) {
        try {
            db.Produit.findAll({
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
            db.Produit.findOne({
                where: { id: req.query.id },
                include: [{
                    model: db.productphoto, attributes: ["id", "photo", "couleur", "taille"]
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
                include: [{ model: db.Produit, order: [['createdAt', 'DESC']], include: [{ model: db.productphoto, attributes: ["id", "photo"] }] }]
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
                    model: db.Produit, order: [['createdAt', 'DESC']], required: true, where: {
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
            db.Produit.findAll({
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
            db.Produit.findAll({
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


    
   /**************update Backgroud ********************************* */ 
   async Updatebackground(req, res, next) {
    console.log(req.body)
    try {
        const { id, titre ,description } = req.body;
        db.background.findOne({
            where: { id: id }
        })
            .then(Produit => {
                if (Produit) {
                    return db.background.update({
                        titre: titre,
                        description :description,
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

/*********************** homepub video */

async updatehomevideo(req, res, next) {
    console.log(req.body)
    try {
        const { id, titre, text } = req.body;
        db.homevideo.findOne({
            where: { id: id }
        })
            .then(Produit => {
                if (Produit) {
                    return db.homevideo.update({
                        titre: titre,
                        text: text,
                        video: req.file ? req.file.location : Produit.video,
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

/***************************  Service **************************************/
async updateservice(req, res, next) {
    console.log(req.body)
    try {
        const { id, titre, text } = req.body;
        db.services.findOne({
            where: { id: id }
        })
            .then(Produit => {
                if (Produit) {
                    return db.services.update({
                        titre: titre,
                        text: text,
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



async updateservicevideo(req, res, next) {
    console.log(req.body)
    try {
        const { id, titrevideo, textvideo } = req.body;
        db.servicesvideo.findOne({
            where: { id: id }
        })
            .then(Produit => {
                if (Produit) {
                    return db.servicesvideo.update({
                        titrevideo: titrevideo,
                        textvideo: textvideo,
                        video: req.file ? req.file.location : Produit.video,
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


 
async getAllCart(req, res, next) {
    try {
       
        db.Cart.findAll({
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

}


