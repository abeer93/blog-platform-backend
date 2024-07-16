import { Context, Next } from 'koa';
import { PostRequestBody } from '../interfaces/PostInterfaces';
import * as response from '../utils/response';

export const validatePostBody = async (ctx: Context, next: Next) => {
  const { title, content, tags } = ctx.request.body as PostRequestBody;

  const errors: { [key: string]: string } = {};

  if (!title) {
    errors.title = 'Title is required';
  } else if (title.trim().length < 2) {
    errors.title = 'Title must be at least 2 characters long';
  }

  if (!content) {
    errors.content = 'Content is required';
  } else if (content.trim().length < 2) {
    errors.content = 'Content must be at least 2 characters long';
  }

  if (!tags || !Array.isArray(tags)) {
    errors.tags = 'Tags must be an array of strings';
  }

  if (Object.keys(errors).length > 0) {
    return response.validationError(ctx, errors);
  }

  await next();
};
