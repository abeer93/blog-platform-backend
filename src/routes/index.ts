
import Router from '@koa/router';
import authRoutes from './authRoutes';
import postRoutes from './postRoutes';

const router = new Router();

router.use('/auth', authRoutes.routes(), authRoutes.allowedMethods());
router.use('/posts', postRoutes.routes(), postRoutes.allowedMethods());

export default router;
