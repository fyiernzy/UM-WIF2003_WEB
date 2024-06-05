import mongoose from "mongoose";

const { Schema } = mongoose;

const imageSchema = new Schema({
  path: { type: String, required: true },
  originalname: { type: String, required: true },
  mimetype: { type: String, required: true },
});

const postSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: [imageSchema], // Updated to include images
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
