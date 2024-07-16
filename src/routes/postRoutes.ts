import Router from '@koa/router';
import { createPost, getPosts, getPostById, updatePost, deletePost } from '../controllers/postController';
import { createComment, deleteComment } from '../controllers/commentController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validatePostBody } from '../middleware/postValidation';
import { validateCommentBody } from '../middleware/commentValidation';

const router = new Router();

router.post('/', authMiddleware, validatePostBody, createPost);
router.get('/', authMiddleware, getPosts);
router.get('/:id', authMiddleware, getPostById);
router.put('/:id', authMiddleware, validatePostBody, updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.post('/:id/comments', authMiddleware, validateCommentBody, createComment);
router.delete('/:id/comments/:commentId', authMiddleware, deleteComment);

export default router;
