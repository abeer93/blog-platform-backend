import mongoose, { Schema, Document } from 'mongoose';
import { UserDocument } from './User';
import { PostDocument } from './Post';

export interface CommentDocument extends Document {
  content: string;
  author: UserDocument['_id'];
  post: PostDocument['_id'];
  createdAt: Date
}

const CommentSchema: Schema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<CommentDocument>('Comment', CommentSchema);
