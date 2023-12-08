import express from 'express';
import { authRouter } from './resources/auth'
import { categoryRouter } from './resources/category'
import { productRouter } from './resources/product'
// import { vendorRouter } from './resources/vendor'
// import { locationRouter } from './resources/location'
 import { customerRouter } from './resources/customer';
 import { orderRouter } from './resources/order';
import { commercialRouter } from './resources/commercial';
// import { paymentRouter } from './resources/payment';
import { productgrosRouter } from './resources/productgros';


 
export const restRouter = express.Router();

/*exportation de la Router de passager de donner de differentes category enfin envoyer ou de recuperer ou update des donnees dans la base de donnees................................*/

restRouter.use('/auth', authRouter);
restRouter.use('/category', categoryRouter);
restRouter.use('/product', productRouter);

restRouter.use('/productgros', productgrosRouter);

restRouter.use('/customer', customerRouter);
restRouter.use('/commercial', commercialRouter);

// restRouter.use('/vendor', vendorRouter);

restRouter.use('/order', orderRouter);
// restRouter.use('/payment', paymentRouter);
