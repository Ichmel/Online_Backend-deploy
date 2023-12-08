import express from 'express';
import authController from './auth.controller';
import { localStrategy , jwtStrategy} from '../../../middleware/strategy';
import { sanitize } from '../../../middleware/sanitizer';
import { validateBody, schemas } from '../../../middleware/validator';

export const authRouter = express.Router();
authRouter.route('/register').post(sanitize(), authController.addUser);
authRouter.route('/user/getAllUserList').get(sanitize(),  authController.getAllUserList);
authRouter.route('/user/update').post(sanitize(),  authController.userUpdate);
authRouter.route('/user/delete').post(sanitize(), authController.deleteUserList);
authRouter.route('/getUserByEmailId').get(sanitize(), authController.findUser);
authRouter.route('/rootLogin').post(sanitize(), authController.login);


