import BaseController from "./BaseController.js";
import CommentService from "../services/CommentService.js";
import { validateRequest } from "../middlewares/validate.js";
import {
  addCommentSchema,
  commentIdSchema,
  modifyCommentSchema,
} from "../validators/commentValidators.js";

class CommentController extends BaseController {
  constructor() {
    super();
    this.addComment = this.addComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.modifyComment = this.modifyComment.bind(this);
    this.likeComment = this.likeComment.bind(this);
    this.unlikeComment = this.unlikeComment.bind(this);
    this.getCommentsByPostId = this.getCommentsByPostId.bind(this);
  }

  async addComment(req, res) {
    await this.handleRequest(
      req,
      res,
      CommentService.addComment,
      req.params.postId,
      req.body.userId,
      req.body.comment
    );
  }

  async deleteComment(req, res) {
    validateRequest(commentIdSchema)(req, res, async () => {
      await this.handleRequest(
        req,
        res,
        CommentService.deleteComment,
        req.params.commentId
      );
    });
  }

  async modifyComment(req, res) {
    validateRequest(modifyCommentSchema)(req, res, async () => {
      await this.handleRequest(
        req,
        res,
        CommentService.modifyComment,
        req.params.commentId,
        req.body.content
      );
    });
  }

  async likeComment(req, res) {
    await this.handleRequest(
      req,
      res,
      CommentService.likeComment,
      req.params.commentId,
      req.body.userId
    );
  }

  async unlikeComment(req, res) {
    await this.handleRequest(
      req,
      res,
      CommentService.unlikeComment,
      req.params.commentId,
      req.body.userId
    );
  }

  async getCommentsByPostId(req, res) {
    await this.handleRequest(
      req,
      res,
      CommentService.getCommentsByPostId,
      req.params.postId
    );
  }
}

export default new CommentController();
