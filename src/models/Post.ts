import { Schema, model, Document, Types } from "mongoose";

export interface IComment extends Document {
  user: Types.ObjectId;
  text: string;
  date: Date;
}

interface IPost extends Document {
  user: Types.ObjectId;
  text: string;
  likes: { user: Types.ObjectId }[];
  comments: IComment[];
  date: Date;
}

const PostSchema = new Schema<IPost>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = model<IPost>("Post", PostSchema);
export default Post;
