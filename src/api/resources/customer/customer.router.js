import express from 'express';
import customerController from './customer.controller';
import { sanitize } from '../../../middleware/sanitizer';



export const customerRouter = express.Router();
customerRouter.route('/resetPassword').post(sanitize(), customerController.rootPassword );

customerRouter.route('/getUserByEmailId').get(sanitize(), customerController.findUser);
customerRouter.route('/login').post(sanitize(), customerController.login);

customerRouter.route('/getProductById').get(sanitize(),customerController.getCustomerListById );


customerRouter.route('/register').post(sanitize(), customerController.addRegister);


customerRouter.route('/verifier').post(sanitize(), customerController.resetPassword);


// get all customer
customerRouter.route('/list').get(sanitize(), customerController.getAllCustomer);
customerRouter.route('/update').post(sanitize(), customerController.getCustomerUpdate);
customerRouter.route('/delete').delete(sanitize(),customerController.deleteCustomer);

customerRouter.route('/listClientmsg').get(sanitize(), customerController.getAllCustomerMessge);


// Post all customer msg
customerRouter.route('/custmsg').post(sanitize(), customerController.Messagecust );
customerRouter.route('/adminmsg').post(sanitize(), customerController.Messageadmin);
customerRouter.route('/prodmsg').post(sanitize(),customerController.MessageProduit);


customerRouter.route('/prodList').get(sanitize(),customerController.MessageListProd);
customerRouter.route('/msgadmin').get(sanitize(),customerController.findMessgAdmin );
customerRouter.route('/msgcust').get(sanitize(),customerController.findMessgCustomer);
