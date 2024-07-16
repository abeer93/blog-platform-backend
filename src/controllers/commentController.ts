import { Context } from 'koa';
import Comment from '../models/Comment';
import { UserDocument } from '../models/User';
import { ObjectId } from 'mongodb';
import * as response from '../utils/response';
import { CommentDTO, toCommentDTO } from '../dtos/comment.dto';
import Post from '../models/Post';
import mongoose from 'mongoose';
import { CommentRequestBody } from '../interfaces/CommentInterfaces';

export const createComment = async (ctx: Context) => {
  const { id } = ctx.params;
  const { content } = ctx.request.body as CommentRequestBody;
  const author = ctx.state.user.id;

  const post = await Post.findById(id);
  if (!post) {
    return response.notExist(ctx, 'Post not found.');
  }

  try {
    const newComment = new Comment({ content, author, post: id });
    await newComment.save();

    post.comments.push(newComment._id as mongoose.Types.ObjectId);
    await post.save();

    newComment.author = author;
    const responseObject: CommentDTO = toCommentDTO(newComment);

    response.createdSuccessfully(ctx, responseObject);
  } catch (err) {
    response.validationError(ctx, { message: 'Error creating comment' });
  }
};

export const deleteComment = async (ctx: Context) => {
  const { id, commentId } = ctx.params;
  const loggedUser = ctx.state.user;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return response.notExist(ctx, 'Comment not found.');
    }

    const author = comment.author as UserDocument;
    const authorId = author._id as ObjectId;

    if (!authorId.equals(ctx.state.user._id) && !loggedUser.isAdmin) {
      return response.notAllowed(ctx, 'You are not authorized to delete this comment.');
    }

    await comment.deleteOne();
    ctx.body = { message: 'Comment deleted successfully' };
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: 'Failed to delete comment' };
  }
};
