import express from 'express';
import productController from './product.controller';
 import { jwtStrategy } from '../../../middleware/strategy';
import { sanitize } from '../../../middleware/sanitizer';
import  { upload } from '../../../awsbucket';
import { videoUpload } from '../../../videoUpload';

export const productRouter = express.Router();
productRouter.route('/create').post(sanitize(), upload, productController.addProduct);
productRouter.route('/getAllproduct').get(sanitize(), productController.index);

productRouter.route('/addcreate').post(sanitize(), upload, productController.addMultiProduct);

productRouter.route('/getAllproductList').get(sanitize(), productController.getAllProductList);

//update categorie
productRouter.route('/update').post(sanitize(), upload, productController.update);


//update background
productRouter.route('/updatebackground').post(sanitize(), upload, productController.Updatebackground);


//update home video
productRouter.route('/updatehomevideo').post(sanitize(), videoUpload, productController.updatehomevideo);


//update service
productRouter.route('/updateservice').post(sanitize(), upload, productController.updateservice);

productRouter.route('/updatevideoservice').post(sanitize(), videoUpload, productController.updateservicevideo);

//productRouter.route('/getProductByCategory').get(sanitize(), productController.getProductListByCategory);
 productRouter.route('/getProductById').get(sanitize(), productController.getProductListById);


//update category
productRouter.route('/main/update').post(sanitize(), upload, productController.MainCategoryUpdate);

productRouter.route('/getWebProductById').get(sanitize(), productController.getWebProductListById);
productRouter.route('/similar').get(sanitize(), productController.getSimilarProductsByChild);


// productRouter.route('/product-offer').post(sanitize(), productController.addProductOffer);
// productRouter.route('/getAllProductOffer').get(sanitize(), productController.getProductOffer);
// productRouter.route('/delete').delete(sanitize(), productController.productDelete);
// productRouter.route('/deleteOfferById/:id').get(sanitize(), productController.productOfferDelete);

 productRouter.route('/upload').post(sanitize(), upload, productController.addPhoto);
 productRouter.route('/getAllPhoto').get(sanitize(), productController.getAllPhoto);
 productRouter.route('/updatephoto').post(sanitize(), productController.productphotoUpdate);
 
// productRouter.route('/slider-photo/delete').delete(sanitize(), productController.deleteSliderPhoto);

// //Category by product

productRouter.route('/getAllGroceryStaple').get(sanitize(), productController.getAllGrocerryStaples);


productRouter.route('/list/:name').get(sanitize(), productController.getAllProductBySlug);
// productRouter.route('/getAllByCategory').post(sanitize(), productController.GetAllByCategory);
productRouter.route('/getallProductbySubChildCat').post(sanitize(), productController.getProductSubChildCat);

// // Filter product
productRouter.route('/gcatalogsearch/result').get(sanitize(), productController.getFilterbyProduct);

// //new api
// productRouter.route('/search_product').post( productController.searchProductBySubCat);


// //aws image delete
// productRouter.route('/aws/delete/photo').post(sanitize(), productController.awsProductPhotoDelete);


productRouter.route('/Listcart').get(sanitize(), productController.getAllCart);


productRouter.route('/meileurvente').get(sanitize(), productController.getMeilleVente );










