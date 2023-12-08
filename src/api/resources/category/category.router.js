import express from 'express';
import categoryController from './category.controller';
import { localStrategy } from '../../../middleware/strategy';

// import multer from 'multer';
// import path from 'path';
import { sanitize } from '../../../middleware/sanitizer';
import { jwtStrategy } from '../../../middleware/strategy';
import { validateBody, schemas } from '../../../middleware/validator';
import  { upload } from '../../../awsbucket';
import { videoUpload } from '../../../videoUpload';

/*........................Router de passager de donner de differentes category................................*/

export const categoryRouter = express.Router();
categoryRouter.route('/create').post(sanitize(), upload, categoryController.index);
categoryRouter.route('/main/list').get(sanitize(), categoryController.mainList);

categoryRouter.route('/sub-category/create').post(sanitize(), categoryController.subCategoryCreate);
categoryRouter.route('/sub-category/list').get(sanitize(), categoryController.subCategoryList);

categoryRouter.route('/child-category/create').post(sanitize(), categoryController.childCategoryCreate);
categoryRouter.route('/child-category/list').get(sanitize(), categoryController.childCategoryList);



//get all category by slug
categoryRouter.route('/cn/list').get(sanitize(),categoryController.getAllCategoryBySlug);
categoryRouter.route('/c/:name/:id').get(sanitize(),categoryController.filterByCategoryList);

//update
categoryRouter.route('/sub-cat/update').post(sanitize(), categoryController.SubCategoryUpdate);
categoryRouter.route('/child-category/update').post(sanitize(), categoryController.childCategoryUpdate);


//update productphoto
categoryRouter.route('/photoupdate').post(sanitize(), categoryController.productphotoUpdate);



//update productphotogros
categoryRouter.route('/photogrosupdate').post(sanitize(), categoryController.productphotogrosUpdate);




//Filter 
categoryRouter.route('/sub-list').get(sanitize(), categoryController.getSubCategoryList); 
categoryRouter.route('/child-list').get(sanitize(), categoryController.getChildCategoryList);



//Searching filter category
categoryRouter.route('/catlogsearch/child-category').post(sanitize(),categoryController.getFilterbyCategory);
categoryRouter.route('/catlogsearch/product').post(sanitize(), categoryController.getProductBySubcategory);



//delete
categoryRouter.route('/cat/deletecatId').delete(sanitize(), categoryController.getDeletedCategoryList);
categoryRouter.route('/sub/deletesubId').delete(sanitize(), categoryController.getDeletedSubCatList);
categoryRouter.route('/child/deletechildId').delete(sanitize(), categoryController.getDeletedChildList);

//delete Produit
categoryRouter.route('/deleteproductId').delete(sanitize(), categoryController.getDeleteProductList);
categoryRouter.route('/deleteimageId').delete(sanitize(), categoryController.getDeleteImageList);


//delete Produit
categoryRouter.route('/deleteproductgrosId').delete(sanitize(), categoryController.getDeleteProductListgros);
categoryRouter.route('/deleteimagegrosId').delete(sanitize(), categoryController.getDeleteImageListgros);



// categoryRouter.route('/login').post(sanitize(),validateBody(schemas.loginSchema),localStrategy, categoryController.login);


//Video home pub 


categoryRouter.route('/createvideopub').post(sanitize(), videoUpload, categoryController.indexvideo);

categoryRouter.route('/affichevideopub').get(sanitize(),  categoryController.afficheVideo);

categoryRouter.route('/affichevideobytitre').get(sanitize(),  categoryController.afficheVideoByTitre);

categoryRouter.route('/deletehomeId').delete(sanitize(), categoryController.getDeletedhomevideoList);



//service

categoryRouter.route('/createservices').post(sanitize(), upload, categoryController.indexservice);

categoryRouter.route('/afficheservices').get(sanitize(),  categoryController.afficheservice);

categoryRouter.route('/deleteservicesId').delete(sanitize(), categoryController.getDeletedservice);



categoryRouter.route('/videoservices').post(sanitize(), videoUpload, categoryController.servicevideo);

categoryRouter.route('/affichevideoservices').get(sanitize(),  categoryController.videoservice);

categoryRouter.route('/deletevideoservicesId').delete(sanitize(), categoryController.getDeletedvideoservice);



//couleur

categoryRouter.route('/createcouleur').post(sanitize(),  categoryController.addcouleur);

categoryRouter.route('/affichecouleur').get(sanitize(),  categoryController.couleurList);

categoryRouter.route('/updatecouleur').post(sanitize(), categoryController.couleurUpdate);

categoryRouter.route('/deletecouleurId').delete(sanitize(), categoryController.couleurdelete);

//Titre
categoryRouter.route('/createtitle').post(sanitize(),  categoryController.addtitle);

categoryRouter.route('/affichetitle').get(sanitize(),  categoryController.titlelist);

categoryRouter.route('/updatetitle').post(sanitize(), categoryController.titleUpdate);

categoryRouter.route('/deletetitleId').delete(sanitize(), categoryController.titledelete);

categoryRouter.route('/affichetitlebyId').get(sanitize(), categoryController.afficheByTitle);


categoryRouter.route('/affichebyId?').get(sanitize(), categoryController.afficheTitreby);


//local 

categoryRouter.route('/createlocal').post(sanitize(),  categoryController.addlocal);

categoryRouter.route('/affichelocal').get(sanitize(),  categoryController.localList);

categoryRouter.route('/updatelocal').post(sanitize(), categoryController.localUpdate);

categoryRouter.route('/deletelocalId').delete(sanitize(), categoryController.localdelete);


categoryRouter.route('/deletecartId').delete(sanitize(), categoryController.getDeletedCart);



//background

categoryRouter.route('/createbackground').post(sanitize(), upload, categoryController.indexbackground);

categoryRouter.route('/affichebackground').get(sanitize(),  categoryController.backgroundList);

categoryRouter.route('/deletebackground').delete(sanitize(), categoryController.getDeletedbackground);


categoryRouter.route('/affichebackgroundbyId').get(sanitize(),  categoryController.afficheBackByTitre);

