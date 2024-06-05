import Comment from "../models/comment.js";
import Post from "../models/post.js";
import { handleNotFound } from "../utils/errorHandler.js";

class CommentService {
  async addComment(postId, userId, content) {
    const comment = await Comment.create({
      post: postId,
      author: userId,
      content,
    });
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
    const populatedComment = await Comment.findById(comment._id).populate(
      "author"
    );

    return populatedComment;
  }

  async deleteComment(commentId) {
    const comment = await Comment.findByIdAndDelete(commentId);
    handleNotFound(comment, "Comment");
    const post = await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: commentId },
    });
    handleNotFound(post, "Post");
  }

  async modifyComment(commentId, content) {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );
    handleNotFound(comment, "Comment");
    return comment;
  }

  async likeComment(commentId) {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { $inc: { likes: 1 } },
      { new: true }
    );
    handleNotFound(comment, "Comment");
    return comment;
  }

  async unlikeComment(commentId) {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { $inc: { likes: -1 } },
      { new: true }
    );
    handleNotFound(comment, "Comment");
    return comment;
  }

  async getCommentsByPostId(postId) {
    const comments = await Comment.find({ post: postId }).populate("author");
    handleNotFound(comments, "Comments");
    return comments;
  }
}

export default new CommentService();
