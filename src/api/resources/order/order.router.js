import express from 'express';
import orderController from './order.controller';
import { jwtStrategy } from '../../../middleware/strategy';
import { sanitize } from '../../../middleware/sanitizer';
// import { validateBody, schemas } from '../../../middleware/validator';

export const orderRouter = express.Router();
orderRouter.route('/create').post(sanitize(),orderController.index);
orderRouter.route('/status/update').post(sanitize(),orderController.statusUpdate);
orderRouter.route('/list').post(sanitize(),orderController.getAllOrderListById);

orderRouter.route('/status').post(sanitize(),orderController.getAllOrderStatus);
orderRouter.route('/count').get(sanitize(),orderController.getAllOrderCount);

orderRouter.route('/addressList').get(sanitize(),orderController.getaddresslist);


orderRouter.route('/listByid').get(sanitize(),orderController.getAllOrderList);

orderRouter.route('/cartList').get(sanitize(),orderController.getcartlist);


orderRouter.route('/orderById').get(sanitize(),orderController.getOrderProduitId);


orderRouter.route('/orderlist').get(sanitize(),orderController.getAllOrder);

orderRouter.route('/liste').get(sanitize(),orderController.getAllOrderLis );

orderRouter.route('/updatecommission').post(sanitize(),orderController.commissionUpdate );




















