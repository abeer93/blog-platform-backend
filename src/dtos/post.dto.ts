import { UserDocument } from '../models/User';
import { PostDocument } from '../models/Post';
import { CommentDTO, toCommentDTO } from './comment.dto';
import { CommentDocument } from '../models/Comment';

export interface PostDTO {
    id: string;
    title: string;
    content: string;
    author: {
      authorId: string;
      name: string;
    };
    tags: string[];
    comments: CommentDTO[];
}

export const toPostDTO = (post: PostDocument, appendComments: boolean = false): PostDTO => {  
    const author = post.author as UserDocument;
  console.log(" create dto", post);

    const comments: CommentDTO[] = appendComments ? (post.comments as unknown as CommentDocument[]).map((comment: CommentDocument) => toCommentDTO(comment)) : [];
    console.log(" we are dto");
    console.log("author name:", author ? author.name : "");
    return {
      // id: (post._id as unknown as string).toString(),
      id: (post._id?.toString()) ?? '',
      title: post.title,
      content: post.content,
      author: {
        authorId: (author._id as unknown as string).toString(),
        name: author && author.name ? author.name : '',
      },
      tags: post.tags,
      comments
    };
};
  