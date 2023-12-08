import { db } from '../../../models';



export default {

    /* Add client api start here................................*/


    /*........................Ajouter des Categorie................................*/
    async index(req, res, next) {
        console.log(req.file)
        try {
            const { name, slug } = req.body;
            
                db.category.create({
                            name: name,
                            slug: slug,
                            photo: req.file ? req.file.location : '',

                 })
               
                .then(category => {
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



    /*........................Recuperation donnees des Categorie................................*/

    async mainList(req, res, next) {
        db.category.findAll({order: [['createdAt', 'DESC']],})
            .then(category => {
                res.status(200).json({ 'success': true, data: category });
            })
            .catch(function (err) {
                next(err)
            });
    },

   
    async getDeletedCategoryList(req, res, next) {
        try {
            db.category.findOne({ where: { id: parseInt(req.query.id) } })
                .then(list => {
                    if (list) {
                        return db.category.destroy({ where: { id: list.id } })
                    }
                    throw new RequestError('Id is not found')
                })
                .then(re => {
                    return res.status(200).json({ 'msg': 'success', 'status': "deleted Sub_Category Seccessfully" });
                }).catch(err => {
                    next(err)
                })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    /*........................Ajouter des SubCategorie................................*/

    async subCategoryCreate(req, res, next) {
        const { name, categoryId, description } = req.body;
        console.log(req.body)
      
         db.SubCategory.create({ name: name, description: description, categoryId: categoryId })
           
            .then(data => {
                res.status(200).json({ 'success': true, msg: "Successfully inserted category" });
            })
            .catch(function (err) {
                next(err)
            });
    },

    /*........................Recuperation des donnees de Categories...............................*/

    async subCategoryList(req, res, next) {
        db.SubCategory.findAll({
            include: [{ model: db.category, attributes: ["id", "name"] }]
        })
            .then(category => {
                res.status(200).json({ 'success': true, data: category });
            })
            .catch(function (err) {
                next(err)
            });
    },

    /*........................Update   des donnees de SubCategorie................................*/

    async SubCategoryUpdate(req, res, next) {
        const { id, name, description } = req.body;
        db.SubCategory.findOne({ where: { id: id } })
            .then(data => {
                if (data) {
                    return db.SubCategory.update({
                         name: name, 
                         description: description
                         }, { where: { id: data.id } })  
                }
                throw new RequestError('Id is Empty', 409);
            })
            .then(category => {
                res.status(200).json({ 'success': true, msg: "Successfully inserted category" });
            })
            .catch(function (err) {
                next(err)
            });
    },

    
    async getDeletedSubCatList(req, res, next) {
        try {
            db.SubCategory.findOne({ where: { id: parseInt(req.query.id) } })
                .then(list => {
                    if (list) {
                        return db.SubCategory.destroy({ where: { id: list.id } })
                    }
                    throw new RequestError('Id is not found')
                })
                .then(re => {
                    return res.status(200).json({ 'msg': 'success', 'status': "deleted Sub_Category Seccessfully" });
                }).catch(err => {
                    next(err)
                })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },


    /*........................Update   des donnees de productphoto................................*/

    async productphotoUpdate(req, res, next) {
        const { id, couleur, taille } = req.body;
        console.log(req.body)

        if (!id) {
            return res.status(400).json({ success: false, error: 'ID is missing in the request.' });
        }


        db.productphoto.findOne({ where: { id: id } })
            .then(data => {
                if (data) {
                    return db.productphoto.update({
                        couleur: couleur,
                        taille: taille
                    }, { where: { id: data.id } })

                        .then(category => {
                            res.status(200).json({ success: true, msg: "Successfully updated category" });
                        });
                }
                throw new RequestError('ID not found', 404);
            })
            .catch(function (err) {
                next(err);
            });
    },


    

    /*........................Update   des donnees de productphoto................................*/

    async productphotogrosUpdate(req, res, next) {
        const { id, couleur, taille } = req.body;
        console.log(req.body)

        if (!id) {
            return res.status(400).json({ success: false, error: 'ID is missing in the request.' });
        }


        db.productphotogros.findOne({ where: { id: id } })
            .then(data => {
                if (data) {
                    return db.productphotogros.update({
                        couleur: couleur,
                        taille: taille
                    }, { where: { id: data.id } })

                        .then(category => {
                            res.status(200).json({ success: true, msg: "Successfully updated category" });
                        });
                }
                throw new RequestError('ID not found', 404);
            })
            .catch(function (err) {
                next(err);
            });
    },


    /*........................Ajouter des donnees de ChildCategories................................*/

    //child category id
    async childCategoryCreate(req, res, next) {
        const { name, categoryId, subCatId, description } = req.body;
        console.log(req.body)
        
                 db.ChildCategory.create({ name: name, categoryId: categoryId, subCatId: subCatId, description:description })
            
            .then(data => {
                res.status(200).json({ 'success': true, msg: "Successfully inserted childcategory" });
            })
            .catch(function (err) {
                next(err)
            });
    },

    /*........................Recuperation des donnees de ChildCategories................................*/

    async childCategoryList(req, res, next) {

        db.ChildCategory.findAll({order: [['createdAt', 'DESC']],
            include: [{ model: db.SubCategory, attributes: ['id', 'name'], include: [{ model: db.category, attributes: ["id", "name"] }] }]
        })
            .then(category => {
                res.status(200).json({ 'success': true, data: category });
            })
            .catch(function (err) {
                next(err)
            });
    },



    
    async childCategoryUpdate(req, res, next) {
        const { id, name } = req.body;
        db.ChildCategory.findOne({ where: { id: id } })
            .then(data => {
                if (data) {
                    return db.ChildCategory.update({ name: name}, { where: { id: data.id } })
                }
                throw new RequestError('Id is Empty', 409);
            })
            .then(category => {
                res.status(200).json({ 'success': true, msg: "Successfully inserted category" });
            })
            .catch(function (err) {
                next(err)
            });
    },


    
    async getDeletedChildList(req, res, next) {
        try {
            db.ChildCategory.findOne({ where: { id: parseInt(req.query.id) } })
                .then(list => {
                    if (list) {
                        return db.ChildCategory.destroy({ where: { id: list.id } })
                    }
                    throw new RequestError('Id is not found')
                })
                .then(re => {
                    return res.status(200).json({ 'msg': 'success', 'status': "deleted Sub_Category Seccessfully" });
                }).catch(err => {
                    next(err)
                })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },



    /*........................Les Order  Des Subcategories  par Categorie................................*/


    async getSubCategoryList(req, res, next) {
        try {
            db.SubCategory.findAll({order: [['createdAt', 'DESC']],
                where: { categoryId: req.query.categoryId },
                include: [{ model: db.category, attributes: ["id", "name"] }]
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



    /*........................Les Order  Des Childcategories  par SubCategorie................................*/


    async getChildCategoryList(req, res, next) {
        try {
            db.ChildCategory.findAll({
                where: { subCatId: req.query.subCatId },
                include: [{ model: db.SubCategory, attributes: ["id", "name"] }]
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


    /*........................Les Filtrer par categories................................*/


    async getAllCategoryBySlug(req, res, next) {
        try {
            db.category.findOne({
                where: { name: req.query.name },
                include: [{ model: db.SubCategory, include: [{ model: db.ChildCategory }] }]

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


    async filterByCategoryList(req, res, next) {
        try {
            db.Produit.findAll({ order: [['createdAt', 'DESC']],
                where: { chilCategoryId: req.params.id },
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


    /* ......................Pour le rechercher des produits dans la barre de rechercher ................................*/

    async getFilterbyCategory(req, res, next) {
        try {
            let { id, name } = req.body;
            db.SubCategory.findOne({
                attributes: ["id", "name"],
                where: { id: id, name: name },
                include: [{ model: db.ChildCategory }]
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


    async getProductBySubcategory(req, res, next) {
        try {
            let { id, name } = req.body;
            let search = '%%';
            if (name) {
                search = '%' + name + '%';
            }
            db.ChildCategory.findAll({
                attributes: ["id", "name"],
                include: [{
                    model: db.Produit, order: [['createdAt', 'DESC']], required: true, where: {
                        [Op.or]: [{ nomprod: { [Op.like]: search }, chilCategoryId: id }],
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




    /*........................Ajouter Des  Couleur................................*/

    async addcouleur(req, res, next) {
        const { color } = req.body;
        db.Couleur.findOne({ where: { color: color } })
            .then(data => {
                if (data) {
                    return db.Couleur.update({ color: color }, { where: { id: data.id } })
                }
                return db.Couleur.create({ color: color })
            })
            .then(category => {
                res.status(200).json({ 'success': true, msg: "Successfully inserted category" });
            })
            .catch(function (err) {
                next(err)
            });
    },

    /*........................Recuperation couleur................................*/

    async couleurList(req, res, next) {
        db.Couleur.findAll({order: [['createdAt', 'DESC']],})
            .then(category => {
                res.status(200).json({ 'success': true, data: category });
            })
            .catch(function (err) {
                next(err)
            });
    },

    /*........................Update  cooleur  ................................*/

    async couleurUpdate(req, res, next) {
        const { id, color } = req.body;
        db.Couleur.findOne({ where: { id: id } })
            .then(data => {
                if (data) {
                    return db.Couleur.update({ color: color }, { where: { id: data.id } })
                }
                throw new RequestError('Id is Empty', 409);
            })
            .then(category => {
                res.status(200).json({ 'success': true, msg: "Successfully inserted category" });
            })
            .catch(function (err) {
                next(err)
            });
    },

    
async couleurdelete(req, res, next) {
    try {
        db.Couleur.findOne({ where: { id: parseInt(req.query.id) } })
            .then(list => {
                if (list) {
                    return db.Couleur.destroy({ where: { id: list.id } })
                }
                throw new RequestError('Id is not found')
            })
            .then(re => {
                return res.status(200).json({ 'msg': 'success', 'status': "deleted Sub_Category Seccessfully" });
            }).catch(err => {
                next(err)
            })
    }
    catch (err) {
        throw new RequestError('Error');
    }
},
    /*........................Ajouter Des  Taille................................*/

    async addtitle(req, res, next) {
        const { title, description , desc , titre } = req.body;
        console.log(req.body)
       
               
               db.Title.create({ title: title ,  description : description ,
                    desc : desc , titre : titre })
           
            .then(category => {
                res.status(200).json({ 'success': true, msg: "Successfully inserted category" });
            })
            .catch(function (err) {
                next(err)
            });
    },

    /*........................Recuperation taille................................*/

    async titlelist(req, res, next) {
        db.Title.findAll({order: [['createdAt', 'DESC']],})
            .then(category => {
                res.status(200).json({ 'success': true, data: category });
            })
            .catch(function (err) {
                next(err)
            });
    },

    /*........................Update taille  ................................*/

    async titleUpdate(req, res, next) {
        const { id, title, description , desc , titre   } = req.body;
        console.log(req.body)
        db.Title.findOne({ where: { id: id } })
            .then(data => {
                if (data) {
                    return db.Title.update({ title: title, description : description ,
                    desc : desc , titre : titre  }, { where: { id: data.id } })
                }
                throw new RequestError('Id is Empty', 409);
            })
            .then(category => {
                res.status(200).json({ 'success': true, msg: "Successfully inserted category" });
            })
            .catch(function (err) {
                next(err)
            });
    },


       
async titledelete(req, res, next) {
    try {
        db.Title.findOne({ where: { id: parseInt(req.query.id) } })
            .then(list => {
                if (list) {
                    return db.Title.destroy({ where: { id: list.id } })
                }
                throw new RequestError('Id is not found')
            })
            .then(re => {
                return res.status(200).json({ 'msg': 'success', 'status': "deleted Sub_Category Seccessfully" });
            }).catch(err => {
                next(err)
            })
    }
    catch (err) {
        throw new RequestError('Error');
    }
},

    
async afficheByTitle(req, res, next) {
    try {
        db.Title .findAll({
            where: { title: req.query.title }})
            .then(category => {
                res.status(200).json({ 'success': true, data: category });
            })
            .catch(function (err) {
                next(err)
            });
    }
    catch (err) {
        throw new RequestError('Error');
    }
},

   
async afficheTitreby(req, res, next) {
    try {
        db.Title .findOne({
            where: { titre: req.query.titre }})
            .then(category => {
                res.status(200).json({ 'success': true, data: category });
            })
            .catch(function (err) {
                next(err)
            });
    }
    catch (err) {
        throw new RequestError('Error');
    }
},



    /*........................Ajouter Des  local................................*/

    async addlocal(req, res, next) {
        console.log(req.body)
        const { ville, local , km ,prix } = req.body;
        db.localite.findOne({ where: { local: local } })
            .then(data => {
                if (data) {
                    return db.localite.update({ ville: ville , local:local , km:km , prix:prix }, { where: { id: data.id } })
                }
                return db.localite.create({ ville: ville , local:local , km:km , prix:prix })
            })
            .then(category => {
                res.status(200).json({ 'success': true, msg: "Successfully inserted category" });
            })
            .catch(function (err) {
                next(err)
            });
    },

    /*........................Recuperation local................................*/

    async localList(req, res, next) {
        db.localite.findAll({order: [['createdAt', 'DESC']],})
            .then(category => {
                res.status(200).json({ 'success': true, data: category });
            })
            .catch(function (err) {
                next(err)
            });
    },

    /*........................Update  local  ................................*/

    async localUpdate(req, res, next) {
        console.log(req.body)
        const { id ,ville , local , km ,prix } = req.body;
        db.localite.findOne({ where: { id: id } })
            .then(data => {
                if (data) {
                    return db.localite.update({ ville: ville , local:local , km:km , prix:prix }, { where: { id: data.id } })
                }
                throw new RequestError('Id is Empty', 409);
            })
            .then(category => {
                res.status(200).json({ 'success': true, msg: "Successfully inserted category" });
            })
            .catch(function (err) {
                next(err)
            });
    },

    
async localdelete(req, res, next) {
    try {
        db.localite.findOne({ where: { id: parseInt(req.query.id) } })
            .then(list => {
                if (list) {
                    return db.localite.destroy({ where: { id: list.id } })
                }
                throw new RequestError('Id is not found')
            })
            .then(re => {
                return res.status(200).json({ 'msg': 'success', 'status': "deleted Sub_Category Seccessfully" });
            }).catch(err => {
                next(err)
            })
    }
    catch (err) {
        throw new RequestError('Error');
    }
},



  /*........................delete de Produit et productphoto  ................................*/
    
    
    async getDeleteImageList(req, res, next) {
        try {
            db.productphoto.findOne({ where: { id: parseInt(req.query.id) } })
                .then(list => {
                    if (list) {
                        return db.productphoto.destroy({ where: { id: list.id } })
                    }
                    throw new RequestError('Id is not found')
                })
                .then(re => {
                    return res.status(200).json({ 'msg': 'success', 'status': "deleted Sub_Category Seccessfully" });
                }).catch(err => {
                    next(err)
                })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    
    async getDeleteProductList(req, res, next) {
        try {
            db.Produit.findOne({ where: { id: parseInt(req.query.id) } })
                .then(list => {
                    if (list) {
                        return db.Produit.destroy({ where: { id: list.id } })
                    }
                    throw new RequestError('Id is not found')
                })
                .then(re => {
                    return res.status(200).json({ 'msg': 'success', 'status': "deleted Sub_Category Seccessfully" });
                }).catch(err => {
                    next(err)
                })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },


    
  /*........................delete de Produit et productphoto  ................................*/
    
    
  async getDeleteImageListgros(req, res, next) {
    try {
        db.productphotogros.findOne({ where: { id: parseInt(req.query.id) } })
            .then(list => {
                if (list) {
                    return db.productphotogros.destroy({ where: { id: list.id } })
                }
                throw new RequestError('Id is not found')
            })
            .then(re => {
                return res.status(200).json({ 'msg': 'success', 'status': "deleted Sub_Category Seccessfully" });
            }).catch(err => {
                next(err)
            })
    }
    catch (err) {
        throw new RequestError('Error');
    }
},


async getDeleteProductListgros(req, res, next) {
    try {
        db.ProduitsGros.findOne({ where: { id: parseInt(req.query.id) } })
            .then(list => {
                if (list) {
                    return db.ProduitsGros.destroy({ where: { id: list.id } })
                }
                throw new RequestError('Id is not found')
            })
            .then(re => {
                return res.status(200).json({ 'msg': 'success', 'status': "deleted Sub_Category Seccessfully" });
            }).catch(err => {
                next(err)
            })
    }
    catch (err) {
        throw new RequestError('Error');
    }
},



  /*........................Ajouter des Home pub ................................*/
  async indexvideo(req, res, next) {
    console.log(req.file)
    try {
        const { titre, text } = req.body;
        db.homevideo.findOne({
            where: { titre: titre }
        })

            .then(data => {
                if (!data) {
                    return db.homevideo.create({
                        titre: titre,
                        text: text,
                        video: req.file ? req.file.location : '',

                    })
                }
                throw new RequestError('Already exist product', 409);
            })
            .then(category => {
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


async afficheVideo(req, res, next) {
    db.homevideo.findAll({order: [['createdAt', 'DESC']],})
        .then(category => {
            res.status(200).json({ 'success': true, data: category });
        })
        .catch(function (err) {
            next(err)
        });
},



async afficheVideoByTitre(req, res, next) {
    try {
        db.homevideo.findOne({
            where: { titre: req.query.titre }})
            .then(category => {
                res.status(200).json({ 'success': true, data: category });
            })
            .catch(function (err) {
                next(err)
            });
    }
    catch (err) {
        throw new RequestError('Error');
    }
},


async getDeletedhomevideoList(req, res, next) {
    try {
        db.homevideo.findOne({ where: { id: parseInt(req.query.id) } })
            .then(list => {
                if (list) {
                    return db.homevideo.destroy({ where: { id: list.id } })
                }
                throw new RequestError('Id is not found')
            })
            .then(re => {
                return res.status(200).json({ 'msg': 'success', 'status': "deleted Sub_Category Seccessfully" });
            }).catch(err => {
                next(err)
            })
    }
    catch (err) {
        throw new RequestError('Error');
    }
},



  /*........................ Services  ................................*/
  async indexservice(req, res, next) {
    console.log(req.file)
    try {
        const { titre, text } = req.body;
        db.services.findOne({
            where: { titre: titre }
        })

            .then(data => {
                if (!data) {
                    return db.services.create({
                        titre: titre,
                        text: text,
                        photo: req.file ? req.file.location : '',
                    })
                }
                throw new RequestError('Already exist product', 409);
            })
            .then(category => {
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


async afficheservice(req, res, next) {
    db.services.findAll({order: [['createdAt', 'DESC']],})
        .then(category => {
            res.status(200).json({ 'success': true, data: category });
        })
        .catch(function (err) {
            next(err)
        });
},


async getDeletedservice(req, res, next) {
    try {
        db.services.findOne({ where: { id: parseInt(req.query.id) } })
            .then(list => {
                if (list) {
                    return db.services.destroy({ where: { id: list.id } })
                }
                throw new RequestError('Id is not found')
            })
            .then(re => {
                return res.status(200).json({ 'msg': 'success', 'status': "deleted Sub_Category Seccessfully" });
            }).catch(err => {
                next(err)
            })
    }
    catch (err) {
        throw new RequestError('Error');
    }
},


 /*........................ Video services ................................*/
 async servicevideo(req, res, next) {
    console.log(req.file)
    try {
        const { titrevideo, textvideo } = req.body;
        db.servicesvideo.findOne({
            where: { titrevideo: titrevideo }
        })

            .then(data => {
                if (!data) {
                    return db.servicesvideo.create({
                        titrevideo: titrevideo,
                        textvideo: textvideo,
                        video: req.file ? req.file.location : '',

                    })
                }
                throw new RequestError('Already exist product', 409);
            })
            .then(category => {
                res.status(200).json({ 'success': true, msg: "Successfully inserted video" });
            })
            .catch(function (err) {
                next(err)
            });
    }
    catch (err) {
        throw new RequestError('Error');
    }
},




async videoservice(req, res, next) {
    db.servicesvideo.findAll({order: [['createdAt', 'DESC']],})
        .then(category => {
            res.status(200).json({ 'success': true, data: category });
        })
        .catch(function (err) {
            next(err)
        });
},


async getDeletedvideoservice(req, res, next) {
    try {
        db.servicesvideo.findOne({ where: { id: parseInt(req.query.id) } })
            .then(list => {
                if (list) {
                    return db.servicesvideo.destroy({ where: { id: list.id } })
                }
                throw new RequestError('Id is not found')
            })
            .then(re => {
                return res.status(200).json({ 'msg': 'success', 'status': "deleted video Seccessfully" });
            }).catch(err => {
                next(err)
            })
    }
    catch (err) {
        throw new RequestError('Error');
    }
},



    /*........................Ajouter des background................................*/
    async indexbackground(req, res, next) {
        console.log(req.file)
        try {
            const { titre  , description} = req.body;
            db.background.findOne({
                where: { description :description}
            })

                .then(data => {
                    if (!data) {
                        return db.background.create({
                           
                            titre: titre,
                            photo: req.file ? req.file.location : '',
                            description :description

                        })
                    }
                    throw new RequestError('Already exist product', 409);
                })
                .then(category => {
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



    /*........................Recuperation donnees des background................................*/

    async backgroundList(req, res, next) {
        db.background.findAll({ order: [['createdAt', 'DESC']],})
            .then(category => {
                res.status(200).json({ 'success': true, data: category });
            })
            .catch(function (err) {
                next(err)
            });
    },

   
    async getDeletedbackground (req, res, next) {
        try {
            db.background.findOne({ where: { id: parseInt(req.query.id) } })
                .then(list => {
                    if (list) {
                        return db.background.destroy({ where: { id: list.id } })
                    }
                    throw new RequestError('Id is not found')
                })
                .then(re => {
                    return res.status(200).json({ 'msg': 'success', 'status': "deleted Sub_Category Seccessfully" });
                }).catch(err => {
                    next(err)
                })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    
async afficheBackByTitre(req, res, next) {
    try {
        db.background.findAll({ order: [['createdAt', 'DESC']],
            where: { titre: req.query.titre }})
            .then(category => {
                res.status(200).json({ 'success': true, data: category });
            })
            .catch(function (err) {
                next(err)
            });
    }
    catch (err) {
        throw new RequestError('Error');
    }
},



async getDeletedCart (req, res, next) {
    try {
        db.Cart.findOne({ where: { id: parseInt(req.query.id) } })
            .then(list => {
                if (list) {
                    return db.cart.destroy({ where: { id: list.id } })
                }
                throw new RequestError('Id is not found')
            })
            .then(re => {
                return res.status(200).json({ 'msg': 'success', 'status': "deleted Sub_Category Seccessfully" });
            }).catch(err => {
                next(err)
            })
    }
    catch (err) {
        throw new RequestError('Error');
    }
},


    


}