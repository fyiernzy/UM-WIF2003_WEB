import User from "../models/userModel.js";
import Post from "../models/post.js";
import Comment from "../models/comment.js";
import { handleNotFound } from "../utils/errorHandler.js";

class PostService {
  async fetchPostStats(postId) {
    const post = await Post.findById(postId);
    handleNotFound(post, "Post");
    return {
      numberOfLikes: post.likes.length,
      numberOfComments: post.comments.length,
    };
  }

  async postNewPost(userId, title, content, images) {
    console.log("In PostController/postNewPost, images", images);
    const user = await User.findById(userId);
    handleNotFound(user, "User");
    const post = await Post.create({
      author: userId,
      title: title,
      content: content,
      images: images,
    });
    console.log("In PostController/postNewPost, posts", post);
    return post;
  }

  async getAllPosts() {
    return await Post.find()
      .populate("author")
      .populate("comments")
      .sort({ createdAt: -1 });
  }

  async getAllPostsByUserId(userId) {
    const posts = await Post.find({ author: userId });
    handleNotFound(posts, "Posts");
    return posts;
  }

  async getPostById(postId) {
    const post = await Post.findOne({ _id: postId }).populate("author");
    handleNotFound(post, "Post");
    return post;
  }

  async modifyPost(postId, title, content, images) {
    const post = await Post.findByIdAndUpdate(
      postId,
      { title, content, images },
      { new: true }
    );
    handleNotFound(post, "Post");
    return post;
  }

  async deletePost(postId) {
    const post = await Post.findByIdAndDelete(postId);
    handleNotFound(post, "Post");
    await Comment.deleteMany({ post: postId });
    return { message: "Post deleted" };
  }

  async likePost(postId, userId) {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: userId } },
      { new: true }
    );
    handleNotFound(post, "Post");
    return post;
  }

  async unlikePost(postId, userId) {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true }
    );
    handleNotFound(post, "Post");
    return post;
  }
}

export default new PostService();
