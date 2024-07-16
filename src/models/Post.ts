import mongoose, { Schema, Document } from 'mongoose';
import { UserDocument } from '../models/User';

export interface PostDocument extends Document {
  _id: string; 
  title: string;
  content: string;
  author: UserDocument['_id'];
  tags: string[];
  comments: mongoose.Types.ObjectId[];
}

const PostSchema: Schema =  new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

export default mongoose.model<PostDocument>('Post', PostSchema);
