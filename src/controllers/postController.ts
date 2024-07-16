import { Context } from 'koa';
import Post, { PostDocument } from '../models/Post';
import { PostRequestBody } from '../interfaces/PostInterfaces';
import * as response from '../utils/response';
import { toPostDTO, PostDTO } from '../dtos/post.dto';
import { UserDocument } from '../models/User';
import { ObjectId } from 'mongodb';

export const createPost = async (ctx: Context) => {
  const { title, content, tags } = ctx.request.body as PostRequestBody;
  const author = ctx.state.user;

  try {
    const newPost = new Post({ title, content, author: author._id, tags });
    await newPost.save();
    ctx.body = newPost;

    newPost.author = author;
    const responseObject: PostDTO = toPostDTO(newPost);

    return response.createdSuccessfully(ctx, responseObject);
  } catch (err) {
    response.validationError(ctx, { message: 'Error creating post' });
  }
};

export const getPosts = async (ctx: Context) => {
  try {
    const { tags, title } = ctx.query;
    const filters: any = {};
    if (tags) {
      const tagsArray = typeof tags === 'string' ? tags.split(',') : tags;
      filters.tags = { $in: tagsArray };
    }
    if (title) {
      filters.title = { $regex: title, $options: 'i' };
    }

    const posts: PostDocument[] = await Post.find(filters)
      .populate('author', 'name')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'name',
        },
      });
    const formattedPosts: PostDTO[] = posts.map((post) => toPostDTO(post, true));

    response.successWithData(ctx, formattedPosts);
  } catch (err) {
    response.validationError(ctx, { error: 'Could not fetch posts' });
  }
};

export const getPostById = async (ctx: Context) => {
  const { id } = ctx.params;

  try {
    const post = await Post.findById(id).populate('author', 'name');
    if (!post) {
      return response.notExist(ctx, 'Post not found.');
    }

    const responseObject: PostDTO = toPostDTO(post, true);

    response.successWithData(ctx, responseObject);
  } catch (err) {
    response.validationError(ctx, { error: 'Failed to fetch post' });
  }
};

export const updatePost = async (ctx: Context) => {
  const postId = ctx.params.id;
  const { title, content, tags } = ctx.request.body as Partial<PostRequestBody>;

  try {
    const post = await Post.findById(postId).populate('author', 'name');
    if (!post) {
      return response.notExist(ctx, 'Post not found.');
    }

    const author = post.author as UserDocument;
    const authorId = author._id as ObjectId;

    if (!authorId.equals(ctx.state.user._id)) {
      return response.notAllowed(ctx, 'You are not authorized to update this post.');
    }

    post.title = (title as unknown as string).toString();
    post.content = (content as unknown as string).toString();
    post.tags = Array.isArray(tags) ? tags : [];
    await post.save();

    const responseObject: PostDTO = toPostDTO(post);
    return response.successWithData(ctx, responseObject);
  } catch (err) {
    response.validationError(ctx, { error: 'Failed to update post' });
  }
};

export const deletePost = async (ctx: Context) => {
  
  const postId = ctx.params.id;

  try {
    const post = await Post.findById(postId);
    
    if (!post) {
      return response.notExist(ctx, 'Post not found.');
    }

    const author = post.author as UserDocument;
    const authorId = author._id as ObjectId;

    if (!authorId.equals(ctx.state.user._id)) {
      return response.notAllowed(ctx, 'You are not authorized to delete this post.');
    }

    await post.deleteOne();

    response.successWithMessage(ctx, 'Post deleted successfully');
  } catch (err) {
    response.validationError(ctx, { error: 'Failed to delete post' });
  }
};
