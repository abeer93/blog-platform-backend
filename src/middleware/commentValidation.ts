import { Context, Next } from 'koa';
import { CommentRequestBody } from '../interfaces/CommentInterfaces';
import * as response from '../utils/response';
import { ObjectId } from 'mongodb';

export const validateCommentBody = async (ctx: Context, next: Next) => {
    const { id } = ctx.params;
    const { content } = ctx.request.body as CommentRequestBody;
    const errors: { [key: string]: string } = {};

    if (!content || content.trim().length === 0) {
        errors['content'] = 'Content is required.';
    }

    if (!id || id.trim().length === 0) {
        errors['id'] = 'Post ID is required.';
    }

    let validPostId: Boolean = ObjectId.isValid(id) && new ObjectId(id).toHexString() === id;
    if (!validPostId) {
        errors['id'] = 'Invalid Post ID format';
    }

    if (Object.keys(errors).length > 0) {
        return response.validationError(ctx, errors);
    }

  await next();
};
