import Router from '@koa/router';
import * as authController from '../controllers/authController';
import { validateRegisterBody, validateLoginBody } from '../middleware/userValidation';

const router = new Router();

router.post('/register', validateRegisterBody, authController.register);
router.post('/login', validateLoginBody, authController.login);

export default router;
