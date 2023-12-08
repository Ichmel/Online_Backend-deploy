import express from 'express';
import commercialController from './commercial.controller';
import { sanitize } from '../../../middleware/sanitizer';

export const commercialRouter = express.Router();
commercialRouter.route('/registercom').post(sanitize(), commercialController.addcommercial);
commercialRouter.route('/logincom').post(sanitize(), commercialController.login);
commercialRouter.route('/validebonnus').post(sanitize(), commercialController.valideBonnus);


commercialRouter.route('/update').post(sanitize(), commercialController.getCommercialUpdate);
commercialRouter.route('/getagent').get(sanitize(), commercialController.findCommercial);

commercialRouter.route('/listecom').get(sanitize(), commercialController.getAllCommercial );
commercialRouter.route('/delete').get(sanitize(), commercialController.deleteCommercial);


commercialRouter.route('/getByRemise').get(sanitize(),commercialController.ListeCommLivre);

commercialRouter.route('/getByAll').get(sanitize(),commercialController.ListeBonnus);

commercialRouter.route('/getBycom').get(sanitize(),commercialController.ListeCommission);


commercialRouter.route('/getProductById').get(sanitize(),commercialController.getProductListById);
