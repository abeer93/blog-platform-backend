import { UserDocument } from '../models/User';
import { CommentDocument } from '../models/Comment';

export interface CommentDTO {
    id: string;
    content: string;
    post: string;
    author: {
      authorId: string;
      name: string;
    };
    createdAt: Date
}

export const toCommentDTO = (comment: CommentDocument): CommentDTO => {
    const author = comment.author as UserDocument;
    
    return {
      id: (comment._id as unknown as string).toString(),
      content: comment.content,
      post: comment.post,
      author: {
        authorId: (author._id as unknown as string).toString(),
        name: author.name,
      },
      createdAt: comment.createdAt
  };
};
  