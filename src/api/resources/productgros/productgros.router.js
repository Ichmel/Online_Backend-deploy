import express from 'express';
import productgrosController from './productgros.controller';
 import { jwtStrategy } from '../../../middleware/strategy';
import { sanitize } from '../../../middleware/sanitizer';
import  { upload } from '../../../awsbucket';


export const productgrosRouter = express.Router();
productgrosRouter.route('/create').post(sanitize(), upload, productgrosController.addProduct);
productgrosRouter.route('/getAllproduct').get(sanitize(), productgrosController.index);


productgrosRouter.route('/addcreate').post(sanitize(), upload, productgrosController.addMultiProduct);


productgrosRouter.route('/getAllproductList').get(sanitize(), productgrosController.getAllProductList);
productgrosRouter.route('/update').post(sanitize(), upload, productgrosController.update);

//productRouter.route('/getProductByCategory').get(sanitize(), productController.getProductListByCategory);
productgrosRouter.route('/getProductById').get(sanitize(), productgrosController.getProductGrosListById);



productgrosRouter.route('/getWebProductById').get(sanitize(), productgrosController.getWebProductListById);
productgrosRouter.route('/similar').get(sanitize(), productgrosController.getSimilarProductsByChild);


// productRouter.route('/product-offer').post(sanitize(), productController.addProductOffer);
// productRouter.route('/getAllProductOffer').get(sanitize(), productController.getProductOffer);
// productRouter.route('/delete').delete(sanitize(), productController.productDelete);
// productRouter.route('/deleteOfferById/:id').get(sanitize(), productController.productOfferDelete);

 productgrosRouter.route('/upload').post(sanitize(), upload, productgrosController.addPhoto);
 productgrosRouter.route('/getAllPhoto').get(sanitize(), productgrosController.getAllPhoto);
 productgrosRouter.route('/updatephoto').post(sanitize(), productgrosController.productphotoUpdate);
 
// productRouter.route('/slider-photo/delete').delete(sanitize(), productController.deleteSliderPhoto);

// //Category by product
productgrosRouter.route('/list').get(sanitize(), productgrosController.getAllProductgrosList);
productgrosRouter.route('/listlimite').get(sanitize(), productgrosController.getAllProduitLmite); 


productgrosRouter.route('/list/:name').get(sanitize(), productgrosController.getAllProductBySlug);
// productRouter.route('/getAllByCategory').post(sanitize(), productController.GetAllByCategory);
productgrosRouter.route('/getallProductbySubChildCat').post(sanitize(), productgrosController.getProductSubChildCat);

// // Filter product
productgrosRouter.route('/gcatalogsearch/result').get(sanitize(), productgrosController.getFilterbyProduct);

// //new api
// productRouter.route('/search_product').post( productController.searchProductBySubCat);


// //aws image delete
// productRouter.route('/aws/delete/photo').post(sanitize(), productController.awsProductPhotoDelete);











